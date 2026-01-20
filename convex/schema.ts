import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    bookings: defineTable({
        userId: v.string(), // Clerk User ID
        serviceName: v.string(),
        date: v.number(), // Timestamp
        time: v.string(),
        amount: v.number(),
        status: v.union(
            v.literal("pending"),
            v.literal("confirmed"),
            v.literal("in-progress"),
            v.literal("completed"),
            v.literal("cancelled")
        ),
        address: v.string(),
        tankSize: v.optional(v.string()), // e.g., "1000 - 2000 L"
        tankType: v.optional(v.string()), // e.g., "Overhead"
        paymentStatus: v.optional(v.string()),
    })
        .index("by_user", ["userId"])
        .index("by_status", ["status"]),

    users: defineTable({
        userId: v.string(), // Clerk User ID (primary key for lookups)
        email: v.string(),
        fullName: v.string(),
        role: v.string(), // "admin" | "user"
        walletBalance: v.number(),
        address: v.optional(v.string()),
        phoneNumber: v.optional(v.string()),
    }).index("by_userId", ["userId"]),
});
