'use client'

import Image from 'next/image'
import { useMutation } from 'convex/react'
import { useOrganization } from '@clerk/nextjs'

import { api } from '@/convex/_generated/api'

import { Button } from '@/components/ui/button'

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const create = useMutation(api.board.create)

  const onClick = () => {
    if (!organization) return

    create({
      orgId: organization.id,
      title: 'Sem título',
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="vazio" width={140} height={140} />
      <h2 className="text-2xl font-semibold mt-6">Criar seu primeiro board.</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Comece criando seu primeiro board em sua organização.
      </p>
      <div className="mt-6">
        <Button onClick={onClick}>Criar board</Button>
      </div>
    </div>
  )
}
