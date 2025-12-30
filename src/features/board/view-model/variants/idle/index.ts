import type { Selection } from '../../../domain/selection.ts'
import type { ViewModelParams } from '../../view-model-params'
import type { ViewModel } from '../../view-model-type.ts'
import { useDeleteSelected } from './use-delete-selected.ts'
import { useGoToAddSticker } from './use-go-to-add-sticker.ts'
import { useGoToEditSticker } from './use-go-to-edit-sticker.ts'
import { useGoToSelectionWindow } from './use-go-to-selection-window.ts'
import { useMouseDown } from './use-mouse-down.ts'
import { useSelection } from './use-selection.ts'

export type IdleViewState = {
    type: 'idle'
    selectedIds: Set<string>
    mouseDown?: {
        x: number
        y: number
    }
}

export function useIdleViewModel(params: ViewModelParams) {
    const { nodesModel } = params
    const selection = useSelection(params)
    const deleteSelected = useDeleteSelected(params)
    const goToEditSticker = useGoToEditSticker(params)
    const goToAddSticker = useGoToAddSticker(params)
    const goToSelectionWindow = useGoToSelectionWindow(params)
    const mouseDown = useMouseDown(params)

    return (idleState: IdleViewState): ViewModel => ({
        nodes: nodesModel.nodes.map((node) => ({
            ...node,
            isSelected: selection.isSelected({ idleState, id: node.id }),
            onClick: (e) => {
                const result = goToEditSticker.handleNodeClick({ e, idleState, id: node.id })
                if (result.preventNext) return

                selection.handleNodeClick({ e, idleState, id: node.id })
            },
        })),
        layout: {
            onKeyDown: (e) => {
                const result = goToEditSticker.handleKeyDown({ e, idleState })
                if (result.preventNext) return

                deleteSelected.handleKeyDown({ e, idleState })
                goToAddSticker.handleKeyDown({ e })
            },
        },
        overlay: {
            onMouseDown: (e) => mouseDown.handleOverlayMouseDown({ e, idleState }),
            onMouseUp: () => selection.handleOverlayMouseUp({ idleState }),
        },
        window: {
            onMouseMove: (e) => goToSelectionWindow.handleWindowMouseMove({ e, idleState }),
            onMouseUp: () => mouseDown.handleWindowMouseUp({ idleState }),
        },
        actions: {
            addSticker: {
                isActive: false,
                onClick: goToAddSticker.handleActionClick,
            },
        },
    })
}

export function goToIdle({ selectedIds }: { selectedIds?: Selection } = {}): IdleViewState {
    return {
        type: 'idle',
        selectedIds: selectedIds ?? new Set(),
    }
}
