'use client'

import { LucideIcon } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'

interface ToolButtonProps {
  label: string
  icon: LucideIcon
  onClick: () => void
  isActive?: boolean
  isDisabled?: boolean
}

export const ToolButton = ({
  isDisabled,
  isActive,
  onClick,
  label,
  icon: I,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? 'boardActive' : 'board'}
      >
        <I />
      </Button>
    </Hint>
  )
}
