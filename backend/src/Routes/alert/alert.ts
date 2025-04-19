import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import twilio from "twilio";



dotenv.config();

const router: Router = express.Router();
const prisma = new PrismaClient();

// Validate env variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhone) {
  throw new Error("Twilio environment variables are not set properly.");
}

const client = twilio(accountSid, authToken);

// Interfaces for request bodies
interface ContactRequest {
  message: string;
  contacts: string[];
}

interface FakeCallRequest {
  userPhoneNumber: string;
}

// 🚨 SOS Message Route
router.post("/sos", async (req: Request<{}, {}, ContactRequest>, res: Response): Promise<void> => {
  const { message, contacts } = req.body;

   
  if (!contacts || contacts.length === 0) {
    res.status(400).json({ error: "No contacts provided" });
    return;
  }

  try {
    const results = await Promise.all(
      contacts.map(async (number) => {
        const msg = await client.messages.create({
          body: message,
          from: twilioPhone,
          to: number,
        });
        return msg.sid;
      })
    );

    // Optional: Log to DB (if needed)
    // await prisma.sosAlert.createMany({
    //   data: contacts.map(number => ({
    //     phone: number,
    //     message,
    //     sentAt: new Date()
    //   }))
    // });
 
    res.status(200).json({ success: true, sids: results });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ error: "Failed to send SOS messages" });
  }
});

// 📞 Fake Call Route
router.post("/fake-call", async (req: Request<{}, {}, FakeCallRequest>, res: Response): Promise<void>  => {
  const { userPhoneNumber } = req.body;

  if (!userPhoneNumber) {
    res.status(400).json({ error: "User phone number is required." });
    return
  }

  try {
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: userPhoneNumber,
      from: twilioPhone,
    });

    res.status(200).json({
      message: "Fake call triggered",
      callSid: call.sid,
    });
  } catch (err) {
    console.error("Fake Call Error:", err);
    res.status(500).json({ message: "Error triggering fake call", error: err });
  }
});


router.post("/send-audio-sms", async (req, res): Promise<void> => {
  const { to, audioUrl } = req.body;

  // Minimal validation
  if (!to || !audioUrl) {
    res.status(400).json({ error: "Missing 'to' or 'audioUrl'" });
    return
  }

  try {
    // Fix: Added proper backticks for template literal
    const formattedTo = to.startsWith('+') ? to : `+${to}`;
    
    // Fix: Added proper template literal for message body
    const message = await client.messages.create({
      body: `⚠ Emergency! Listen to audio: ${audioUrl}`,
      from: twilioPhone,  // Ensure this is defined in your scope
      to: formattedTo,
    });

    // Fix: Consistent response format
    res.status(200).json({ 
      success: true, 
      sid: message.sid 
    });

  } catch (error) {
    // Fix: Better error response
    res.status(500).json({ 
      success: false, 
      error: "Failed to send SMS",
      details: error 
    });
  }
});

export default router;
