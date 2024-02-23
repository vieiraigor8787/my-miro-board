'use client'

import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/useApiMutation'
import { cn } from '@/lib/utils'

interface NewBoardBottomProps {
  orgId: string
  disabled?: boolean
}

export const NewBoardBottom = ({ orgId, disabled }: NewBoardBottomProps) => {
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    mutate({
      orgId,
      title: 'Sem título',
    })
      .then((id) => {
        toast.success('Board criado com sucesso.')
      })
      .catch(() => toast.error('Erro na criação de novo board'))
  }

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (pending || disabled) &&
          'opacity-75 hover:bg-blue-600 cursor-not-allowed'
      )}
    >
      <div />
      <Plus className="w-12 h-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">Criar novo board</p>
    </button>
  )
}
