// backend/src/middleware/clerkAuth.ts
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const requireClerkAuth = ClerkExpressRequireAuth({
  audience: 'authenticated-user',
});
