import { v } from 'convex/values'
import { mutation } from './_generated/server'

const images = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg',
]

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) throw new Error('Não autorizado')

    const randomImg = images[Math.floor(Math.random() * images.length)]

    const board = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImg,
    })

    return board
  },
})

export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) throw new Error('Não autorizado')

    //TODO: later check to delete favorite relation as well

    await ctx.db.delete(args.id)
  },
})

export const update = mutation({
  args: { id: v.id('boards'), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) throw new Error('Não autorizado')

    const title = args.title.trim()

    if (!title) throw new Error('Título obrigatório')

    if (title.length > 60)
      throw new Error('O título não pode ter mais do que 60 caracteres.')

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    })

    return board
  },
})
