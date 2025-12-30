import { distanceFromPoints } from '../../domain/point.ts'
import { pointOnScreenToCanvas } from '../../domain/screen-to-canvas.ts'
import { type Selection, type SelectModifier, selectItems } from '../../domain/selection.ts'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type.ts'
import { goToAddSticker } from './add-sticker.ts'
import { goToSelectionWindow } from './selection-window.ts'

export type IdleViewState = {
    type: 'idle'
    selectedIds: Set<string>
    mouseDown?: {
        x: number
        y: number
    }
}

export function useIdleViewModel({ setViewState, nodesModel, canvasRect }: ViewModelParams) {
    const select = (prevState: IdleViewState, ids: string[], modif: SelectModifier) =>
        setViewState({
            ...prevState,
            selectedIds: selectItems(prevState.selectedIds, ids, modif),
        })

    const deleteSelected = (state: IdleViewState) => {
        if (state.selectedIds.size > 0) {
            nodesModel.deleteNodes([...state.selectedIds])
            setViewState({ ...state, selectedIds: new Set() })
        }
    }

    return (idleState: IdleViewState): ViewModel => ({
        nodes: nodesModel.nodes.map((node) => ({
            ...node,
            isSelected: idleState.selectedIds.has(node.id),
            onClick: (e) => {
                select(idleState, [node.id], e.ctrlKey || e.shiftKey ? 'toggle' : 'replace')
            },
        })),
        layout: {
            onKeyDown: (e) => {
                if (e.key === 's') setViewState(goToAddSticker())
                if (e.key === 'Delete' || e.key === 'Backspace') deleteSelected(idleState)
            },
        },
        overlay: {
            onMouseDown: (e) => {
                setViewState({
                    ...idleState,
                    mouseDown: pointOnScreenToCanvas({ x: e.clientX, y: e.clientY }, canvasRect),
                })
            },
        },
        window: {
            onMouseMove: (e) => {
                if (idleState.mouseDown) {
                    const currentPoint = pointOnScreenToCanvas({ x: e.clientX, y: e.clientY }, canvasRect)
                    if (distanceFromPoints(idleState.mouseDown, currentPoint) > 20) {
                        setViewState(
                            goToSelectionWindow(
                                idleState.mouseDown,
                                currentPoint,
                                e.shiftKey ? idleState.selectedIds : undefined,
                            ),
                        )
                    }
                }
            },
            onMouseUp: () => {
                if (idleState.mouseDown) {
                    setViewState({
                        ...idleState,
                        selectedIds: selectItems(idleState.selectedIds, [], 'replace'),
                        mouseDown: undefined,
                    })
                }
            },
        },
        actions: {
            addSticker: {
                isActive: false,
                onClick: () => setViewState(goToAddSticker()),
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
