'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'
import { toast } from 'sonner'
import { MoreHorizontal } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/useApiMutation'
import { Skeleton } from '@/components/ui/skeleton'
import { Actions } from '@/components/actions'

import { Overlay } from '../_components/overlay'
import { Footer } from '../_components/footer'

interface BoardCardProps {
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId: string
  isFavorited: boolean
}

export const BoardCard = ({
  title,
  imageUrl,
  id,
  createdAt,
  authorName,
  authorId,
  orgId,
  isFavorited,
}: BoardCardProps) => {
  const { userId } = useAuth()

  const authorLabel = userId === authorId ? 'Você' : authorName
  const createAtLabel = formatDistanceToNow(createdAt, { locale: pt })

  const { pending: pendingFavorite, mutate: onFavorite } = useApiMutation(
    api.board.favorite
  )
  const { pending: pendingUnfavorite, mutate: onUnfavorite } = useApiMutation(
    api.board.unFavorite
  )

  const toggleFavorite = () => {
    if (isFavorited) {
      onUnfavorite({ id }).catch(() => toast.error('Falha ao tornar favorito.'))
    } else {
      onFavorite({ id: id as Id<'boards'>, orgId }).catch(() =>
        toast.error('Falha ao remover favorito.')
      )
    }
  }

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorited}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/27] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  )
}
