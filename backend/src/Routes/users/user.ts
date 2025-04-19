import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();


// router.post("/check")
router.post("/check", async (req: Request, res: Response): Promise<void> => {
  const { clerkUserId } = req.body;

  if (!clerkUserId) {
    res.status(400).json({ error: "Missing clerkUserId" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (user) {
      res.status(200).json({ found: true, user });
    } else {
      res.status(200).json({ found: false });
    }
  } catch (error) {
    console.error("POST /user/check error:", error);
    res.status(500).json({ error: "Failed to check user" });
  }
});



// ✅ POST /api/user
router.post("/createUser", async (req: Request, res: Response) => {
  const { clerkUserId, name, email, phoneNumber } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        clerkUserId,
        name,
        email,
        phoneNumber,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("POST /user error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
