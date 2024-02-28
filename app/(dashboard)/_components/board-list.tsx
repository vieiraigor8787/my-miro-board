'use client'

import { api } from '@/convex/_generated/api'

import { useQuery } from 'convex/react'
import { EmptyBoards } from './empty-boards'
import { EmptyFavorites } from './empty-favorites'
import { EmptySearch } from './empty-search'
import { NewBoardBottom } from './new-board-bottom'

import { BoardCard } from '../board-card'

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({ query, orgId }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, ...query })

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? 'Boards favoritos' : 'Boards'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardBottom orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    )
  }

  if (!data?.length && query.search) {
    return <EmptySearch />
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />
  }

  if (!data?.length) {
    return <EmptyBoards />
  }

  return (
    <div className="px-6">
      <h2 className="text-3xl">
        {query.favorites ? 'Boards favoritos' : 'Boards'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardBottom orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorited={board.isFavorite}
          />
        ))}
      </div>
    </div>
  )
}
