'use client'

import { memo } from 'react'
import { useStorage } from '@/liveblocks.config'
import { LayerType } from '@/types/canvas'

import { Rectangle } from './rectangle'
import { Ellipse } from './ellipse'
import { Text } from './text'
import { Note } from './note'

interface LayerPreviewProps {
  id: string
  onLayerPointDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}

export const LayerPreview = memo(
  ({ selectionColor, onLayerPointDown, id }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))

    if (!layer) return null

    switch (layer.type) {
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        )
      default:
        return null
    }
  }
)

LayerPreview.displayName = 'LayerPreview'
