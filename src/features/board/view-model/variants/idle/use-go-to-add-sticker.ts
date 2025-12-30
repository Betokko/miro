import { goToAddSticker } from '@/features/board/view-model/variants/add-sticker.ts'
import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'

export function useGoToAddSticker({ setViewState }: ViewModelParams) {
    const handleKeyDown = ({ e }: { e: React.KeyboardEvent<HTMLDivElement> }) => {
        if (e.key === 's') setViewState(goToAddSticker())
        return { preventNext: false }
    }

    const handleActionClick = () => {
        setViewState(goToAddSticker())
    }

    return {
        handleKeyDown,
        handleActionClick,
    }
}
