import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export interface HintProps {
  label: string
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'end' | 'center'
  sideOffset?: number
  alignOffset?: number
}

export const Hint = ({
  sideOffset,
  side,
  alignOffset,
  align,
  label,
  children,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-black border-black"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
