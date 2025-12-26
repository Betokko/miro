import { type RefCallback, useCallback, useState } from 'react'

export type CanvasRect = {
    x: number
    y: number
    width: number
    height: number
}

export function useCanvasRect() {
    const [canvasRect, setCanvasRect] = useState<CanvasRect>()

    const canvasRef: RefCallback<HTMLDivElement> = useCallback((element) => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { x, y } = entry.target.getBoundingClientRect()
                const { width, height } = entry.contentRect
                setCanvasRect({ x, y, width, height })
            }
        })
        if (element) observer.observe(element)
        return () => {
            observer.disconnect()
        }
    }, [])

    return {
        canvasRef,
        canvasRect,
    }
}
