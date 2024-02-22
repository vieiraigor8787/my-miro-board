import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import Image from 'next/image'

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/elements.svg" alt="vazio" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Bem vindo ao Miro Board</h2>
      <p className="text-muted-foreground text-sm mt-2"></p>
      <div className="pt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Criar uma organização</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
