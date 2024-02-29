import { ConvexHttpClient } from 'convex/browser'
import { auth, currentUser } from '@clerk/nextjs'
import { Liveblocks } from '@liveblocks/node'

import { api } from '@/convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret:
    'sk_dev_Pma75TbpPaSL_rJrTGoiXclZxbbqPzQnPLt0sHiU6Bobvr_tKuueMA4Grta9Fos7',
})

export async function POST(request: Request) {
  const authorization = await auth()
  const user = await currentUser()

  console.log('auth info', { authorization, user })

  if (!authorization || !user) {
    return new Response('Não autorizado', { status: 403 })
  }

  const { room } = await request.json()
  const board = await convex.query(api.board.get, { id: room })
  console.log('auth info', {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId,
  })

  if (board?.orgId !== authorization.orgId) {
    return new Response('Não autorizado')
  }

  const userInfo = {
    name: user.firstName || 'Sem nome',
    picture: user.imageUrl,
  }

  console.log({ userInfo })

  const session = liveblocks.prepareSession(user.id, { userInfo })

  if (room) {
    session.allow(room, session.FULL_ACCESS)
  }

  const { status, body } = await session.authorize()
  console.log({ status, body }, 'allowed')

  return new Response(body, { status })
}
