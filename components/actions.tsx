'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Link2 } from 'lucide-react'
import { toast } from 'sonner'

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

export const Actions = ({
  sideOffset,
  side,
  title,
  id,
  children,
}: ActionsProps) => {
  const onCopy = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copiado.'))
      .catch(() => toast.error('Falha ao copiar link'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem onClick={onCopy} className="p-3 cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copiar link do board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
