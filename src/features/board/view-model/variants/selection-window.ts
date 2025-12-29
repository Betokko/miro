import type { Point } from '../../domain/point.ts'
import { createRectFromPoints, isPointInRect } from '../../domain/rect.ts'
import { pointOnScreenToCanvas } from '../../domain/screen-to-canvas.ts'
import { type Selection, selectItems } from '../../domain/selection.ts'
import { goToIdle } from '../variants/idle.ts'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type.ts'

export type SelectionWindowViewState = {
    type: 'selectionWindow'
    startPoint: Point
    endPoint: Point
    initialSelectedIds: Selection
}

export function useSelectionWindowViwModel({ setViewState, nodesModel, canvasRect }: ViewModelParams) {
    return (state: SelectionWindowViewState): ViewModel => {
        const rect = createRectFromPoints(state.startPoint, state.endPoint)
        return {
            selectionWindow: rect,
            nodes: nodesModel.nodes.map((node) => ({
                ...node,
                isSelected: isPointInRect(node, rect) || state.initialSelectedIds.has(node.id),
            })),
            window: {
                onMouseMove: (e) => {
                    setViewState({
                        ...state,
                        endPoint: pointOnScreenToCanvas({ x: e.clientX, y: e.clientY }, canvasRect),
                    })
                },
                onMouseUp: () => {
                    const nodes = nodesModel.nodes.filter((node) => isPointInRect(node, rect)).map((node) => node.id)
                    setViewState(
                        goToIdle({
                            selectedIds: selectItems(state.initialSelectedIds, nodes, 'add'),
                        }),
                    )
                },
            },
        }
    }
}

export function goToSelectionWindow(
    startPoint: Point,
    endPoint: Point,
    initialSelectedIds?: Set<string>,
): SelectionWindowViewState {
    return {
        type: 'selectionWindow',
        startPoint,
        endPoint,
        initialSelectedIds: initialSelectedIds ?? new Set(),
    }
}
