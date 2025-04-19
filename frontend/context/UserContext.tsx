// context/UserContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

type DBUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  clerkUserId: string;
  location?: string;
  createdAt: string;
};

type UserContextType = {
  dbUser: DBUser | null;
};

const UserContext = createContext<UserContextType | null>(null); // ✅ use proper type

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState<DBUser | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      const API = process.env.NEXT_PUBLIC_API_BASE_URL;

      try {
        const res = await axios.post(`${API}user/check`, {
          clerkUserId: user.id,
        });

        if (res.data.found) {
         
          setDbUser(res.data.user);
        } else {
          const createRes = await axios.post(`${API}user/createUser`, {
            clerkUserId: user.id,
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
            email: user.primaryEmailAddress?.emailAddress,
            phoneNumber: user.primaryPhoneNumber?.phoneNumber ?? null,
          });

          setDbUser(createRes.data);
        }
      } catch (err) {
        console.error("User sync failed:", err);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return (
    <UserContext.Provider value={{ dbUser }}> {/* ✅ no TS error now */}
      {children}
    </UserContext.Provider>
  );
};

export const useDbUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useDbUser must be used within a UserProvider");
  }
  return context;
};
