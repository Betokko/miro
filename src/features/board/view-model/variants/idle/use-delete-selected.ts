import type { ViewModelParams } from '../../view-model-params'
import type { IdleViewState } from './index'

export function useDeleteSelected(params: ViewModelParams) {
    const deleteSelected = (idleState: IdleViewState) => {
        if (idleState.selectedIds.size > 0) {
            params.nodesModel.deleteNodes([...idleState.selectedIds])
            params.setViewState({ ...idleState, selectedIds: new Set() })
        }
    }

    const handleKeyDown = ({ e, idleState }: { idleState: IdleViewState; e: React.KeyboardEvent<HTMLDivElement> }) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            deleteSelected(idleState)
        }
    }
    return { handleKeyDown }
}
