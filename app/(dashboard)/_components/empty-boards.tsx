'use client'

import Image from 'next/image'
import { useOrganization } from '@clerk/nextjs'

import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useApiMutation } from '@/hooks/useApiMutation'
import { toast } from 'sonner'

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    if (!organization) return

    mutate({
      orgId: organization.id,
      title: 'Sem título',
    })
      .then((id) => {
        toast.success('Board criado com sucesso')
      })
      .catch(() => toast.error('Deu ruim =/'))
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="vazio" width={140} height={140} />
      <h2 className="text-2xl font-semibold mt-6">Criar seu primeiro board.</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Comece criando seu primeiro board em sua organização.
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick}>
          Criar board
        </Button>
      </div>
    </div>
  )
}
