import type { Rect } from '../domain/rect.ts'

export function SelectionWindow({ width, height, y, x }: Rect) {
    return (
        <div
            className='absolute inset-0 border-2 bg-indigo-600/25 border-indigo-600 z-200'
            style={{ transform: `translate(${x}px, ${y}px)`, width, height }}
        />
    )
}
