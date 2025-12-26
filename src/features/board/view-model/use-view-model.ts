import { useAddStickerViwModel } from '@/features/board/view-model/variants/add-sticker.ts'
import type { CanvasRect } from '../hooks/use-canvas-rect.ts'
import type { NodesModel } from '../model/use-nodes'
import type { ViewStateModel } from '../model/use-view-state'
import { useIdleViewModel } from './variants/idle.ts'

export type ViewModel = {
    nodes?: Array<{
        id: string
        text: string
        x: number
        y: number
        isSelected?: boolean
        onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    }>
    layout?: {
        onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    }
    canvas?: {
        onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    }
    overlay?: {
        onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
        onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
        onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
    }
    actions?: {
        addSticker?: {
            isActive: boolean
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
        }
    }
}

export type ViewModelParams = {
    viewStateModel: ViewStateModel
    nodesModel: NodesModel
    canvasRect: CanvasRect | undefined
}

export function useViewModel(params: ViewModelParams): ViewModel {
    const idleViewModel = useIdleViewModel(params)
    const addStickerViewModel = useAddStickerViwModel(params)

    switch (params.viewStateModel.viewState.type) {
        case 'idle':
            return idleViewModel(params.viewStateModel.viewState)
        case 'addSticker':
            return addStickerViewModel()
    }
}
