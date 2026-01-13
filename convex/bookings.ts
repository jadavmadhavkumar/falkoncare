import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// Create a booking
export const createBooking = mutation({
  args: {
    customerId: v.id("users"),
    serviceId: v.optional(v.string()),
    bookingDate: v.string(),
    bookingTime: v.string(),
    address: v.string(),
    tankSize: v.optional(v.string()),
    tankType: v.optional(v.string()),
    notes: v.optional(v.string()),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const bookingId = await ctx.db.insert("bookings", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return { bookingId }
  },
})

// Get user bookings
export const getUserBookings = query({
  args: { customerId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_customerId", (q) => q.eq("customerId", args.customerId))
      .order("desc")
      .collect()
  },
})

// Get all bookings (admin)
export const getAllBookings = query({
  handler: async (ctx) => {
    return await ctx.db.query("bookings").order("desc").collect()
  },
})

// Update booking status
export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId)
    if (!booking) {
      throw new Error("Booking not found")
    }

    return await ctx.db.patch(args.bookingId, {
      status: args.status,
      updatedAt: Date.now(),
    })
  },
})

// Assign staff to booking
export const assignStaffToBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
    staffId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId)
    if (!booking) {
      throw new Error("Booking not found")
    }

    return await ctx.db.patch(args.bookingId, {
      staffId: args.staffId,
      updatedAt: Date.now(),
    })
  },
})
