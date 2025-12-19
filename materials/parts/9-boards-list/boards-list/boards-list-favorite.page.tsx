import { useState } from 'react'
import { BoardCard } from './compose/board-card'
import { BoardItem } from './compose/board-item'
import { useBoardsList } from './model/use-boards-list'
import { BoardsListLayout, BoardsListLayoutContent, BoardsListLayoutHeader } from './ui/boards-list-layout'
import { BoardsSidebar } from './ui/boards-sidebar'
import { type ViewMode, ViewModeToggle } from './ui/view-mode-toggle'

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
                cursorRef={boardsQuery.cursorRef}
                hasCursor={boardsQuery.hasNextPage}
                mode={viewMode}
                renderList={() => boardsQuery.boards.map((board, i) => <BoardItem board={board} key={i} />)}
                renderGrid={() => boardsQuery.boards.map((board, i) => <BoardCard board={board} key={i} />)}
            />
        </BoardsListLayout>
    )
}

export const Component = BoardsListPage
