'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'

import { useAuth } from '@clerk/nextjs'

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

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
        </div>
        <Footer
          isFavorite={isFavorited}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createAtLabel}
          onClick={() => {}}
          disabled={false}
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
