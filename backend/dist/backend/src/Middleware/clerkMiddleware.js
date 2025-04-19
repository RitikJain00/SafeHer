"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireClerkAuth = void 0;
// backend/src/middleware/clerkAuth.ts
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
exports.requireClerkAuth = (0, clerk_sdk_node_1.ClerkExpressRequireAuth)({
    audience: 'authenticated-user',
});
