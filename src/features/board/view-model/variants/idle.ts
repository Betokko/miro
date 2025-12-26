import type { IdleViewState } from '../../model/use-view-state.ts'
import type { ViewModel, ViewModelParams } from '../use-view-model.ts'

export function useIdleViewModel({ viewStateModel, nodesModel }: ViewModelParams) {
    return (idleState: IdleViewState): ViewModel => ({
        nodes: nodesModel.nodes.map((node) => ({
            ...node,
            isSelected: idleState.selectedIds.has(node.id),
            onClick: (e) => {
                e.ctrlKey || e.shiftKey
                    ? viewStateModel.selection([node.id], 'toggle')
                    : viewStateModel.selection([node.id], 'replace')
            },
        })),
        layout: {
            onKeyDown: (e) => {
                if (e.key === 's') viewStateModel.goToAddSticker()
            },
        },
        overlay: {
            onClick: (_e) => {
                viewStateModel.selection([], 'replace')
            },
        },
        actions: {
            addSticker: {
                isActive: false,
                onClick: () => viewStateModel.goToAddSticker(),
            },
        },
    })
}
