import type React from 'react'
import { pointOnScreenToCanvas } from '@/features/board/domain/screen-to-canvas.ts'
import type { IdleViewState } from '@/features/board/view-model/variants/idle/index.ts'
import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'

export function useMouseDown({ setViewState, canvasRect }: ViewModelParams) {
    const handleOverlayMouseDown = ({
        idleState,
        e,
    }: {
        idleState: IdleViewState
        e: React.MouseEvent<HTMLDivElement>
    }) => {
        setViewState({
            ...idleState,
            mouseDown: pointOnScreenToCanvas({ x: e.clientX, y: e.clientY }, canvasRect),
        })
    }

    const handleWindowMouseUp = ({ idleState }: { idleState: IdleViewState }) => {
        setViewState({
            ...idleState,
            mouseDown: undefined,
        })
    }

    return {
        handleOverlayMouseDown,
        handleWindowMouseUp,
    }
}
