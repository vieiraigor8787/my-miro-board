interface PathProps {
  x: number
  y: number
  points: number[][]
  fill: string
  onPointerDown?: (e: React.PointerEvent) => void
  selectionColor?: string
  stroke?: string
}

export const Path = ({
  stroke,
  onPointerDown,
  y,
  x,
  points,
  fill,
}: PathProps) => {
  return <div>Path</div>
}
