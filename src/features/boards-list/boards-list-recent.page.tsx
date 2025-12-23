import { useState } from 'react'
import { BoardCard } from '@/features/boards-list/compose/board-card.tsx'
import { BoardItem } from '@/features/boards-list/compose/board-item'
import { useBoardsList } from '@/features/boards-list/model/use-boards-list'
import { useRecentGroups } from '@/features/boards-list/model/use-recent-groups'
import {
    BoardsLayoutContentGroups,
    BoardsListLayout,
    BoardsListLayoutCards,
    BoardsListLayoutContent,
    BoardsListLayoutHeader,
    BoardsListLayoutList,
} from '@/features/boards-list/ui/boards-list-layout'
import { BoardsSidebar } from '@/features/boards-list/ui/boards-sidebar'
import { type ViewMode, ViewModeToggle } from '@/features/boards-list/ui/view-mode-toggle'

function BoardsListPage() {
    const boardsQuery = useBoardsList({
        sort: 'lastOpenedAt',
    })

    const [viewMode, setViewMode] = useState<ViewMode>('list')

    const recentGroups = useRecentGroups(boardsQuery.boards)

    return (
        <BoardsListLayout
            sidebar={<BoardsSidebar />}
            header={
                <BoardsListLayoutHeader
                    title='Последние доски'
                    description='Здесь вы можете просматривать и управлять своими последними досками'
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
            >
                <BoardsLayoutContentGroups
                    groups={recentGroups.map((group) => ({
                        items: {
                            list: (
                                <BoardsListLayoutList>
                                    {group.items.map((board, i) => (
                                        <BoardItem board={board} key={i} />
                                    ))}
                                </BoardsListLayoutList>
                            ),
                            cards: (
                                <BoardsListLayoutCards>
                                    {group.items.map((board, i) => (
                                        <BoardCard board={board} key={i} />
                                    ))}
                                </BoardsListLayoutCards>
                            ),
                        }[viewMode],
                        title: group.title,
                    }))}
                />
            </BoardsListLayoutContent>
        </BoardsListLayout>
    )
}

export const Component = BoardsListPage
