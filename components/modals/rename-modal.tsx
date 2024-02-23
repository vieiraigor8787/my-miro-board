'use client'

import { useRenameModal } from '@/store/useRenameModal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

export const RenameModal = () => {
  const { initialValues, onClose, isOpen } = useRenameModal()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Renomear</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
