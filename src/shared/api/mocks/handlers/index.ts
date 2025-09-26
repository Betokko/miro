import { HttpResponse } from 'msw'
import type { ApiSchemas } from '@/shared/api/schema'
import { http } from '../http.ts'

const boards: ApiSchemas['Board'][] = [
    {
        id: 'board-1',
        name: 'Marketing Campaign',
    },
    {
        id: 'board-2',
        name: 'Product Roadmap',
    },
]

export const handlers = [
    http.get('/boards', () => {
        return HttpResponse.json(boards)
    }),
    http.post('/boards', async (ctx) => {
        const data = await ctx.request.json()
        const board = {
            id: crypto.randomUUID(),
            name: data.name,
        }
        boards.push(board)
        return HttpResponse.json(board)
    }),
    http.delete('/boards/{boardId}', async ({ params }) => {
        const { boardId } = params
        const index = boards.findIndex((board) => board.id === boardId)
        if (index === -1) {
            return HttpResponse.json({ message: 'Board not found', code: 'NOT_FOUND' })
        }
        boards.splice(index, 1)
        return HttpResponse.json({ message: 'Board deleted', code: 'SUCCESS' })
    }),
]
