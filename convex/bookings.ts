import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Public query to get all bookings (admin only, but kept public for demo)
export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("bookings").collect();
    },
});

// Get bookings for a specific user
export const getByUser = query({
    args: {},
    handler: async (ctx) => {
        // TEMPORARY: Return all bookings for testing (authentication disabled)
        // TODO: Re-enable authentication filtering once Convex dev server is configured

        /* const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }
        return await ctx.db
            .query("bookings")
            .withIndex("by_user", (q) => q.eq("userId", identity.subject))
            .collect(); */

        // For now, return all bookings
        return await ctx.db.query("bookings").collect();
    },
});

// Create a new booking
export const create = mutation({
    args: {
        serviceName: v.string(),
        date: v.number(),
        time: v.string(),
        amount: v.number(),
        address: v.string(),
        tankSize: v.optional(v.string()),
        tankType: v.optional(v.string()),
        paymentMethod: v.union(v.literal("cash"), v.literal("wallet")),
    },
    handler: async (ctx, args) => {
        // TEMPORARY: Authentication disabled for testing
        // TODO: Re-enable authentication once Convex dev server is properly configured

        /* const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated call to create booking");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .unique();

        if (!user) {
            throw new Error("User not found");
        } */

        // Using a temporary test user ID for now
        const testUserId = "test-user-" + Date.now();

        // Handle wallet payment (disabled for testing)
        let paymentStatus = "pending";
        if (args.paymentMethod === "wallet") {
            // Wallet payment disabled during testing
            // In production, this would check balance and deduct
            paymentStatus = "pending"; // Changed from "paid" to "pending" since we can't verify balance
        }

        const bookingId = await ctx.db.insert("bookings", {
            userId: testUserId, // Using test user ID instead of identity.subject
            serviceName: args.serviceName,
            date: args.date,
            time: args.time,
            amount: args.amount,
            address: args.address,
            tankSize: args.tankSize,
            tankType: args.tankType,
            status: "confirmed", // Auto-confirm for now
            paymentStatus: paymentStatus,
        });

        return bookingId;
    },
});

// Update booking status (admin)
export const updateStatus = mutation({
    args: {
        id: v.id("bookings"),
        status: v.union(
            v.literal("pending"),
            v.literal("confirmed"),
            v.literal("in-progress"),
            v.literal("completed"),
            v.literal("cancelled")
        ),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});