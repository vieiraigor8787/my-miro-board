'use client'

import { useState } from 'react'

import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config'
import { CanvasMode, CanvasState } from '@/types/canvas'

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

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

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
      <svg className="h-[100vh] w-[100vw]">
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
