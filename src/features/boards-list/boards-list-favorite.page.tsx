import { useState } from 'react'
import { BoardCard } from '@/features/boards-list/compose/board-card'
import { BoardItem } from '@/features/boards-list/compose/board-item.tsx'
import { useBoardsList } from '@/features/boards-list/model/use-boards-list.ts'
import {
    BoardsListLayout,
    BoardsListLayoutContent,
    BoardsListLayoutHeader,
} from '@/features/boards-list/ui/boards-list-layout'
import { BoardsSidebar } from '@/features/boards-list/ui/boards-sidebar'
import { type ViewMode, ViewModeToggle } from '@/features/boards-list/ui/view-mode-toggle.tsx'

function BoardsListPage() {
    const boardsQuery = useBoardsList({
        isFavorite: true,
    })

    const [viewMode, setViewMode] = useState<ViewMode>('list')

    return (
        <BoardsListLayout
            sidebar={<BoardsSidebar />}
            header={
                <BoardsListLayoutHeader
                    title='Избранные доски'
                    description='Здесь вы можете просматривать и управлять своими избранными досками'
                    actions={<ViewModeToggle value={viewMode} onChange={(value) => setViewMode(value)} />}
                />
            }
        >
            <BoardsListLayoutContent
                isEmpty={boardsQuery.boards.length === 0}
                isPending={boardsQuery.isPending}
                isPendingNext={boardsQuery.isFetchingNextPage}
                ref={boardsQuery.ref}
                hasRef={boardsQuery.hasNextPage}
                mode={viewMode}
                renderList={() => boardsQuery.boards.map((board, i) => <BoardItem board={board} key={i} />)}
                renderGrid={() => boardsQuery.boards.map((board, i) => <BoardCard board={board} key={i} />)}
            />
        </BoardsListLayout>
    )
}

export const Component = BoardsListPage
