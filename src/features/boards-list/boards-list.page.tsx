import { useState } from 'react'
import { BoardCard } from '@/features/boards-list/compose/board-card.tsx'
import { BoardItem } from '@/features/boards-list/compose/board-item.tsx'
import { useBoardsFilters } from '@/features/boards-list/model/use-boards-filters.ts'
import { useBoardsList } from '@/features/boards-list/model/use-boards-list.ts'
import { useCreateBoard } from '@/features/boards-list/model/use-create-board.ts'
import {
    BoardsListLayout,
    BoardsListLayoutContent,
    BoardsListLayoutFilters,
    BoardsListLayoutHeader,
} from '@/features/boards-list/ui/boards-list-layout.tsx'
import { BoardsSearchInput } from '@/features/boards-list/ui/boards-search-input.tsx'
import { BoardsSortSelect } from '@/features/boards-list/ui/boards-sort-select.tsx'
import { type ViewMode, ViewModeToggle } from '@/features/boards-list/ui/view-mode-toggle.tsx'
import { useDebouncedValue } from '@/shared/lib/react'
import { Button } from '@/shared/ui/kit/button'

function BoardsListPage() {
    const boardFilters = useBoardsFilters()
    const boardsQuery = useBoardsList({
        sort: boardFilters.sort,
        search: useDebouncedValue(boardFilters.search),
    })
    const createBoard = useCreateBoard()

    const [viewMode, setViewMode] = useState<ViewMode>('cards')

    return (
        <BoardsListLayout
            header={
                <BoardsListLayoutHeader
                    title='Доски'
                    description='Список досок'
                    actions={
                        <Button onClick={createBoard.create} disabled={createBoard.isPending}>
                            Создать доску
                        </Button>
                    }
                />
            }
            filters={
                <BoardsListLayoutFilters
                    filters={<BoardsSearchInput value={boardFilters.search} onChange={boardFilters.setSearch} />}
                    sort={<BoardsSortSelect value={boardFilters.sort} onValueChange={boardFilters.setSort} />}
                    actions={<ViewModeToggle value={viewMode} onChange={setViewMode} />}
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
                renderList={() => boardsQuery.boards.map((board) => <BoardItem key={board.id} board={board} />)}
                renderGrid={() => boardsQuery.boards.map((board) => <BoardCard key={board.id} board={board} />)}
            />
        </BoardsListLayout>
    )
}

export const Component = BoardsListPage
