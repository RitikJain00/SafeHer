"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
dotenv_1.default.config();
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// Validate env variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
if (!accountSid || !authToken || !twilioPhone) {
    throw new Error("Twilio environment variables are not set properly.");
}
const client = (0, twilio_1.default)(accountSid, authToken);
// 🚨 SOS Message Route
router.post("/sos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, contacts } = req.body;
    if (!contacts || contacts.length === 0) {
        res.status(400).json({ error: "No contacts provided" });
        return;
    }
    try {
        const results = yield Promise.all(contacts.map((number) => __awaiter(void 0, void 0, void 0, function* () {
            const msg = yield client.messages.create({
                body: message,
                from: twilioPhone,
                to: number,
            });
            return msg.sid;
        })));
        // Optional: Log to DB (if needed)
        // await prisma.sosAlert.createMany({
        //   data: contacts.map(number => ({
        //     phone: number,
        //     message,
        //     sentAt: new Date()
        //   }))
        // });
        res.status(200).json({ success: true, sids: results });
    }
    catch (error) {
        console.error("Twilio Error:", error);
        res.status(500).json({ error: "Failed to send SOS messages" });
    }
}));
// 📞 Fake Call Route
router.post("/fake-call", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userPhoneNumber } = req.body;
    if (!userPhoneNumber) {
        res.status(400).json({ error: "User phone number is required." });
        return;
    }
    try {
        const call = yield client.calls.create({
            url: "http://demo.twilio.com/docs/voice.xml",
            to: userPhoneNumber,
            from: twilioPhone,
        });
        res.status(200).json({
            message: "Fake call triggered",
            callSid: call.sid,
        });
    }
    catch (err) {
        console.error("Fake Call Error:", err);
        res.status(500).json({ message: "Error triggering fake call", error: err });
    }
}));
router.post("/send-audio-sms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, audioUrl } = req.body;
    // Minimal validation
    if (!to || !audioUrl) {
        res.status(400).json({ error: "Missing 'to' or 'audioUrl'" });
        return;
    }
    try {
        // Fix: Added proper backticks for template literal
        const formattedTo = to.startsWith('+') ? to : `+${to}`;
        // Fix: Added proper template literal for message body
        const message = yield client.messages.create({
            body: `⚠ Emergency! Listen to audio: ${audioUrl}`,
            from: twilioPhone, // Ensure this is defined in your scope
            to: formattedTo,
        });
        // Fix: Consistent response format
        res.status(200).json({
            success: true,
            sid: message.sid
        });
    }
    catch (error) {
        // Fix: Better error response
        res.status(500).json({
            success: false,
            error: "Failed to send SMS",
            details: error
        });
    }
}));
exports.default = router;
