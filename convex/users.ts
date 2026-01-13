import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import bcrypt from "bcryptjs"

// Signup mutation
export const signup = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    fullName: v.string(),
    phone: v.string(),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first()

    if (existingUser) {
      throw new Error("User already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(args.password, 10)

    // Create user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: hashedPassword,
      fullName: args.fullName,
      phone: args.phone,
      role: (args.role || "customer") as "customer" | "admin" | "staff",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    // Create profile for new user
    await ctx.db.insert("profiles", {
      userId,
      walletBalance: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return { userId }
  },
})

// Login mutation
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first()

    if (!user) {
      throw new Error("Invalid email or password")
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(args.password, user.password)

    if (!isPasswordValid) {
      throw new Error("Invalid email or password")
    }

    return { userId: user._id, role: user.role, email: user.email }
  },
})

// Get current user
export const getCurrentUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  },
})

// Get user profile
export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    return profile
  },
})

// Update user profile
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    fullName: v.optional(v.string()),
    phone: v.optional(v.string()),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args

    const user = await ctx.db.get(userId)
    if (!user) {
      throw new Error("User not found")
    }

    const updatedUser = await ctx.db.patch(userId, {
      ...(updates.fullName && { fullName: updates.fullName }),
      ...(updates.phone && { phone: updates.phone }),
      updatedAt: Date.now(),
    })

    return updatedUser
  },
})

// Get all customers (admin only)
export const getAllCustomers = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "customer"))
      .collect()
  },
})

// Get all staff (admin only)
export const getAllStaff = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("role"), "staff"))
      .collect()
  },
})
