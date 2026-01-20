import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Store or update user in Convex
export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we already have this user
        const user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .unique();

        if (user !== null) {
            // If user exists, update their details if they changed (optional optimization: check before patching)
            // For now, only patching essential identity info to keep it in sync, 
            // preserving walletBalance and other app-specific data.
            await ctx.db.patch(user._id, {
                fullName: identity.name || "User",
                email: identity.email || "",
            });
            return user._id;
        }

        // If user doesn't exist, create them
        return await ctx.db.insert("users", {
            userId: identity.subject,
            fullName: identity.name || "User",
            email: identity.email || "",
            role: "user", // Default role
            walletBalance: 0, // Initial balance
            // address and phoneNumber can be updated later via profile page
        });
    },
});

// Get current user
export const current = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .unique();

        return user;
    },
});
