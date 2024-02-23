'use client'

import { Link2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/useApiMutation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ConfirmModal } from './confirm-modal'

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
  const { mutate, pending } = useApiMutation(api.board.remove)

  const onCopy = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copiado.'))
      .catch(() => toast.error('Falha ao copiar link'))
  }

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success('Board excluído com sucesso.'))
      .catch(() => toast.error('Falha ao excluir board.'))
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
          Copiar link deste board
        </DropdownMenuItem>
        <ConfirmModal
          header="Você tem certeza?"
          description="Isso irá excluir este board e todas suas tarefas e não poderá mais ser revertido."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Deletar este board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
