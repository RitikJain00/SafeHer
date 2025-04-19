'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SyncUser() {
  const { user, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      const API = process.env.NEXT_PUBLIC_API_BASE_URL;

      try {
        const res = await axios.post(`${API}user/check`, {
          clerkUserId: user.id,
        });

        if (res.data.found) {
          console.log("✅ User already in DB");
          setDbUser(res.data.user); // Store user details
          return;
        }

        const createRes = await axios.post(`${API}user/createUser`, {
          clerkUserId: user.id,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
          email: user.primaryEmailAddress?.emailAddress,
          phoneNumber: user.primaryPhoneNumber?.phoneNumber ?? null,
        });

        console.log("✅ User created in DB");
        setDbUser(createRes.data); // Store newly created user

      } catch (err) {
        console.error("❌ User sync failed:", err);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null;
}
