import { useQueryClient } from '@tanstack/react-query'
import { generatePath, Link } from 'react-router-dom'
import { rqClient } from '@/shared/api/instance.ts'
import { ROUTES } from '@/shared/model/routes.tsx'
import { Button } from '@/shared/ui/kit/button.tsx'
import { Card, CardFooter, CardHeader } from '@/shared/ui/kit/card'

function BoardsListPage() {
    const queryClient = useQueryClient()
    const boardsQuery = rqClient.useQuery('get', '/boards')
    const createBoardMutation = rqClient.useMutation('post', '/boards', {
        onSettled: async () => await queryClient.invalidateQueries(rqClient.queryOptions('get', '/boards')),
    })
    const deleteBoardMutation = rqClient.useMutation('delete', '/boards/{boardId}', {
        onSettled: async () => await queryClient.invalidateQueries(rqClient.queryOptions('get', '/boards')),
    })

    return (
        <div className={'container mx-auto p-4'}>
            <h1>Boards list</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    createBoardMutation.mutate({ body: { name: formData.get('name') as string } })
                }}
            >
                <input name='name' />
                <Button type='submit' disabled={createBoardMutation.isPending}>
                    Create Board
                </Button>
            </form>

            <div className={'grid grid-cols-3 gap-4'}>
                {boardsQuery.data?.map((board) => (
                    <Card key={board.id}>
                        <CardHeader>
                            <Button asChild variant='link'>
                                <Link to={generatePath(ROUTES.BOARD, { boardId: board.id })}>{board.name}</Link>
                            </Button>
                        </CardHeader>
                        <CardFooter>
                            <Button
                                className={'cursor-pointer'}
                                variant='destructive'
                                disabled={deleteBoardMutation.isPending}
                                onClick={() => deleteBoardMutation.mutate({ params: { path: { boardId: board.id } } })}
                            >
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export const Component = BoardsListPage
