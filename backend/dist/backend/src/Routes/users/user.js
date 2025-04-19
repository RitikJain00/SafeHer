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
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
// router.post("/check")
router.post("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clerkUserId } = req.body;
    if (!clerkUserId) {
        res.status(400).json({ error: "Missing clerkUserId" });
        return;
    }
    try {
        const user = yield prisma.user.findUnique({
            where: { clerkUserId },
        });
        if (user) {
            res.status(200).json({ found: true, user });
        }
        else {
            res.status(200).json({ found: false });
        }
    }
    catch (error) {
        console.error("POST /user/check error:", error);
        res.status(500).json({ error: "Failed to check user" });
    }
}));
// ✅ POST /api/user
router.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clerkUserId, name, email, phoneNumber } = req.body;
    try {
        const user = yield prisma.user.create({
            data: {
                clerkUserId,
                name,
                email,
                phoneNumber,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error("POST /user error:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}));
exports.default = router;
