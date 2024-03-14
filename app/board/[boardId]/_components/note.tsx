import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { NoteLayer } from '@/types/canvas'
import { useMutation } from '@/liveblocks.config'
import { cn, colorToCss, getConstrastingTextColor } from '@/lib/utils'

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
})

const calculateFontSize = (width: number, heigh: number) => {
  const maxFontSize = 96
  const scaleFactor = 0.15
  const fontSizeBasedOnHeight = heigh * scaleFactor
  const fontSizeBasedOnWidth = width * scaleFactor

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}

interface NoteProps {
  id: string
  layer: NoteLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export const Note = ({
  selectionColor,
  onPointerDown,
  layer,
  id,
}: NoteProps) => {
  const { x, y, width, height, fill, value } = layer

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers')

    liveLayers.get(id)?.set('value', newValue)
  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        backgroundColor: fill ? colorToCss(fill) : '#CCC',
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        className={cn(
          'h-full w-full flex items-center justify-center text-center outline-none',
          font.className
        )}
        style={{
          color: fill ? getConstrastingTextColor(fill) : '#000',
          fontSize: calculateFontSize(width, height),
        }}
        html={value || 'Text'}
        onChange={handleContentChange}
      />
    </foreignObject>
  )
}
