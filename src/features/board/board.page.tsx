import { useParams } from 'react-router-dom'
import { CONFIG } from '@/shared/model/config.ts'
import type { PathParams, ROUTES } from '@/shared/model/routes'

function BoardPage() {
    const params = useParams<PathParams[typeof ROUTES.BOARD]>()
    return (
        <>
            <div>{CONFIG.API_BASE_URL}</div>
            <div>Board page {params.boardId}</div>
        </>
    )
}

export const Component = BoardPage
