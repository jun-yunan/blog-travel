import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    return await ctx.db
      .query('blogs')
      .withIndex('by_creation_time')
      .order('desc')
      .take(10);
    // .collect();
  },
});

export const createBlog = mutation({
  args: {
    authorId: v.id('users'),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    const blog = await ctx.db.insert('blogs', args);
    if (!blog) {
      throw new ConvexError('Error creating blog');
    }
    return blog;
  },
});

export const deleteBlog = mutation({
  args: {
    id: v.id('blogs'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    await ctx.db.delete(args.id);
  },
});
