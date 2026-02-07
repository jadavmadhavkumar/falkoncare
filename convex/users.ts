import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// Get current user from Clerk
export const current = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      // Return basic info if user not found in our table
      return {
        clerkId: identity.subject,
        email: identity.email || "",
        fullName: identity.name || "",
        imageUrl: identity.pictureUrl || "",
        role: "user",
        walletBalance: 0,
      };
    }

    return user;
  },
});

// Get user by Clerk ID
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();
  },
});

// Ensure user exists in Convex (called from client)
export const ensureUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("JWT Verification - ensureUser identity:", identity);
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (user) {
      // Hack for testing: Top up wallet if empty
      if ((user.walletBalance || 0) < 5000) {
        await ctx.db.patch(user._id, { walletBalance: 5000 });
      }
      return user._id;
    }

    // Create new user
    const now = Date.now();
    return await ctx.db.insert("users", {
      clerkId: identity.subject,
      email: identity.email || "",
      fullName: identity.name || "",
      imageUrl: identity.pictureUrl || "",
      role: "user",
      walletBalance: 5000,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Create user (called by webhook)
export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, { clerkId, email, fullName, imageUrl }) => {
    const now = Date.now();

    return await ctx.db.insert("users", {
      clerkId,
      email,
      fullName: fullName || "",
      imageUrl: imageUrl || "",
      role: "user",
      walletBalance: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update user (called by webhook)
export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, { clerkId, email, fullName, imageUrl }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        email,
        fullName: fullName || user.fullName,
        imageUrl: imageUrl || user.imageUrl,
        updatedAt: Date.now(),
      });
    }
  },
});

// Delete user (called by webhook)
export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();

    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    fullName: v.optional(v.string()),
    address: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
  },
  handler: async (ctx, { fullName, address, phoneNumber }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      // Create user if doesn't exist
      return await ctx.db.insert("users", {
        clerkId: identity.subject,
        email: identity.email || "",
        fullName: fullName || identity.name || "",
        imageUrl: identity.pictureUrl || "",
        role: "user",
        walletBalance: 5000,
        address,
        phoneNumber,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // Update existing user
    await ctx.db.patch(user._id, {
      ...(fullName !== undefined && { fullName }),
      ...(address !== undefined && { address }),
      ...(phoneNumber !== undefined && { phoneNumber }),
      updatedAt: Date.now(),
    });

    return user._id;
  },
});

// Update wallet balance
export const updateWalletBalance = mutation({
  args: {
    amount: v.number(),
  },
  handler: async (ctx, { amount }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const newBalance = (user.walletBalance || 0) + amount;
    if (newBalance < 0) {
      throw new Error("Insufficient balance");
    }

    await ctx.db.patch(user._id, {
      walletBalance: newBalance,
      updatedAt: Date.now(),
    });

    return newBalance;
  },
});
