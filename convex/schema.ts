import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
    address: v.optional(v.string()),
    birthday: v.optional(v.float64()),
    phone: v.optional(v.string()),
    role: v.optional(v.union(v.literal('admin'), v.literal('user'))),
  })
    .index('by_email', ['email'])
    .index('by_clerkId', ['clerkId']),
  blogs: defineTable({
    authorId: v.id('users'),
    title: v.string(),
    content: v.string(),
  }),
});
