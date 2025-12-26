import type { ViewModel, ViewModelParams } from '../use-view-model.ts'

export function useAddStickerViwModel({ viewStateModel, nodesModel, canvasRect }: ViewModelParams) {
    return (): ViewModel => ({
        nodes: nodesModel.nodes,
        layout: {
            onKeyDown: (e) => {
                if (e.key === 'Escape') viewStateModel.goToIdle()
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
                viewStateModel.goToIdle()
            },
        },
        actions: {
            addSticker: {
                isActive: true,
                onClick: () => viewStateModel.goToIdle(),
            },
        },
    })
}
