import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.string(), // This should be hashed in production
    fullName: v.string(),
    phone: v.string(),
    role: v.union(v.literal("customer"), v.literal("admin"), v.literal("staff")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .searchIndex("search_email", { searchField: "email" }),

  profiles: defineTable({
    userId: v.id("users"),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
    walletBalance: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  bookings: defineTable({
    customerId: v.id("users"),
    serviceId: v.optional(v.string()),
    bookingDate: v.string(),
    bookingTime: v.string(),
    address: v.string(),
    tankSize: v.optional(v.string()),
    tankType: v.optional(v.string()),
    notes: v.optional(v.string()),
    amount: v.number(),
    status: v.string(),
    staffId: v.optional(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_customerId", ["customerId"])
    .index("by_status", ["status"]),

  walletTransactions: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    type: v.string(),
    description: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
})
