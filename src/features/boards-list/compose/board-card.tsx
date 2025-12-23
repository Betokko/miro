import { useDeleteBoard } from '@/features/boards-list/model/use-delete-board.ts'
import { useUpdateFavorite } from '@/features/boards-list/model/use-update-favorite.ts'
import { BoardsFavoriteToggle } from '@/features/boards-list/ui/boards-favorite-toggle.tsx'
import { BoardsListCard } from '@/features/boards-list/ui/boards-list-card.tsx'
import type { ApiSchemas } from '@/shared/api/schema'
import { Button } from '@/shared/ui/kit/button'

export function BoardCard({ board }: { board: ApiSchemas['Board'] }) {
    const deleteBoard = useDeleteBoard()
    const updateFavorite = useUpdateFavorite()

    return (
        <BoardsListCard
            key={board.id}
            board={board}
            rightTopActions={
                <BoardsFavoriteToggle
                    isFavorite={updateFavorite.isOptimisticFavorite(board)}
                    onToggle={() => updateFavorite.toggle(board)}
                />
            }
            bottomActions={
                <Button
                    variant='destructive'
                    disabled={deleteBoard.getIsPending(board.id)}
                    onClick={() => deleteBoard.delete(board.id)}
                >
                    Удалить
                </Button>
            }
        />
    )
}
