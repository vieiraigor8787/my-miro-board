import { Button } from '@/components/ui/button'
import { CreateOrganization } from '@clerk/nextjs'
import Image from 'next/image'

export const EmptyBoards = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="vazio" width={140} height={140} />
      <h2 className="text-2xl font-semibold mt-6">Criar seu primeiro board.</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Comece criando seu primeiro board em sua organização.
      </p>
      <div className="mt-6">
        <Button></Button>
      </div>
    </div>
  )
}
