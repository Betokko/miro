import { goToIdle } from '@/features/board/view-model/variants/idle.ts'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type.ts'

export type AddStickerViewState = {
    type: 'addSticker'
}

export function useAddStickerViwModel({ setViewState, nodesModel, canvasRect }: ViewModelParams) {
    return (): ViewModel => ({
        nodes: nodesModel.nodes,
        layout: {
            onKeyDown: (e) => {
                if (e.key === 'Escape') setViewState(goToIdle())
            },
        },
        canvas: {
            onClick: (e) => {
                if (!canvasRect) return
                nodesModel.addSticker({
                    text: 'New sticker',
                    x: e.clientX - canvasRect.x,
                    y: e.clientY - canvasRect.y,
                })
                setViewState(goToIdle())
            },
        },
        actions: {
            addSticker: {
                isActive: true,
                onClick: () => setViewState(goToIdle()),
            },
        },
    })
}

export function goToAddSticker(): AddStickerViewState {
    return {
        type: 'addSticker',
    }
}
