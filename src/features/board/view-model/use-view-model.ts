import { useState } from 'react'
import { type AddStickerViewState, useAddStickerViwModel } from './variants/add-sticker.ts'
import { goToIdle, type IdleViewState, useIdleViewModel } from './variants/idle.ts'
import { type SelectionWindowViewState, useSelectionWindowViwModel } from './variants/selection-window.ts'
import type { ViewModelParams } from './view-model-params.ts'
import type { ViewModel } from './view-model-type.ts'

export type UseViewModel = IdleViewState | AddStickerViewState | SelectionWindowViewState

export function useViewModel(params: Omit<ViewModelParams, 'setViewState'>): ViewModel {
    const [viewState, setViewState] = useState<UseViewModel>(() => goToIdle())
    const newParams = { ...params, setViewState }
    const idleViewModel = useIdleViewModel(newParams)
    const addStickerViewModel = useAddStickerViwModel(newParams)
    const selectionWindowViewModel = useSelectionWindowViwModel(newParams)

    switch (viewState.type) {
        case 'idle':
            return idleViewModel(viewState)
        case 'addSticker':
            return addStickerViewModel()
        case 'selectionWindow':
            return selectionWindowViewModel(viewState)
    }
}
