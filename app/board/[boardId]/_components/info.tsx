'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Poppins } from 'next/font/google'
import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useRenameModal } from '@/store/useRenameModal'
import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { Actions } from '@/components/actions'
import { Menu } from 'lucide-react'

interface InfoProps {
  boardId: string
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>
}

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal()

  const data = useQuery(api.board.get, { id: boardId as Id<'boards'> })

  if (!data) return <InfoSkeleton />

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Voltar aos boards" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" height={40} width={40} />
            <span
              className={cn(
                'font-semibold text-xl ml-2 text-black',
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Renomear" side="bottom" sideOffset={10}>
        <Button
          onClick={() => onOpen(data._id, data.title)}
          variant="board"
          className="text-base font-normal px-2"
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Menu principal" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  )
}
