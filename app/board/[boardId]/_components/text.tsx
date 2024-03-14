import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { TextLayer } from '@/types/canvas'
import { useMutation } from '@/liveblocks.config'
import { cn, colorToCss } from '@/lib/utils'

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
})

interface TextProps {
  id: string
  layer: TextLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Text = ({
  selectionColor,
  onPointerDown,
  layer,
  id,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
      }}
    >
      <ContentEditable
        className={cn(
          'h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none',
          font.className
        )}
        style={{ color: fill ? colorToCss(fill) : '#000' }}
        html={'Text'}
        onChange={() => {}}
      ></ContentEditable>
    </foreignObject>
  )
}
