import { useState } from 'react'

export type IdleViewState = {
    type: 'idle'
    selectedIds: Set<string>
}
export type AddStickerViewState = {
    type: 'addSticker'
}
type Modif = 'replace' | 'add' | 'toggle'
type UseViewModel = IdleViewState | AddStickerViewState

export function useViewState() {
    const [viewState, setViewState] = useState<UseViewModel>({ type: 'idle', selectedIds: new Set() })

    const goToIdle = () => {
        setViewState({ type: 'idle', selectedIds: new Set() })
    }

    const goToAddSticker = () => {
        setViewState({ type: 'addSticker' })
    }
    const selection = (ids: string[], modif: Modif) => {
        setViewState((prev) => (prev.type === 'idle' ? selectItems(prev, ids, modif) : prev))
    }

    return { viewState, selection, goToIdle, goToAddSticker }
}

function selectItems(viewState: IdleViewState, ids: string[], modif: Modif = 'replace') {
    switch (modif) {
        case 'replace':
            return {
                ...viewState,
                selectedIds: new Set(ids),
            }
        case 'add':
            return {
                ...viewState,
                selectedIds: new Set([...viewState.selectedIds, ...ids]),
            }
        case 'toggle': {
            const currentIds = new Set(viewState.selectedIds)
            const newIds = new Set([...ids])

            const base = [...viewState.selectedIds].filter((id) => !newIds.has(id))
            const added = ids.filter((id) => !currentIds.has(id))

            return {
                ...viewState,
                selectedIds: new Set([...base, ...added]),
            }
        }
    }
}

export type ViewStateModel = ReturnType<typeof useViewState>
