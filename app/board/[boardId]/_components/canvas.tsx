'use client'

import React, { useCallback, useState } from 'react'

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from '@/liveblocks.config'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import { pointerEventToCanvasPoint } from '@/lib/utils'

import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'
import { CursorsPresence } from './cursors-presence'

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()

      const current = pointerEventToCanvasPoint(e, camera)

      setMyPresence({ cursor: current })
    },
    []
  )

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canRedo={canRedo}
        canUndo={canUndo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
