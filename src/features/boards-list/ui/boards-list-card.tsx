import { useLayoutEffect, useRef, useState } from 'react'
import { href, Link } from 'react-router-dom'
import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { Card, CardFooter, CardHeader } from '@/shared/ui/kit/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/kit/tooltip'

interface BoardsListCardProps {
    board: {
        id: string
        name: string
        createdAt: string
        lastOpenedAt: string
    }
    rightTopActions?: React.ReactNode
    bottomActions?: React.ReactNode
}

export function BoardsListCard({ board, bottomActions, rightTopActions }: BoardsListCardProps) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [isTruncated, setIsTruncated] = useState(false)

    useLayoutEffect(() => {
        const element = ref.current
        if (!element) return

        const check = () => setIsTruncated(element.scrollWidth > element.clientWidth)
        check()

        const observer = new ResizeObserver(check)
        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <Card className='relative'>
            <div className='absolute top-2 right-2'>{rightTopActions}</div>
            <CardHeader>
                <div className='flex flex-col gap-2 overflow-hidden'>
                    <Button asChild variant='link' className='text-left justify-start h-auto p-0'>
                        <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span ref={ref} className='block w-full text-xl font-medium truncate'>
                                            {board.name}
                                        </span>
                                    </TooltipTrigger>

                                    {isTruncated && (
                                        <TooltipContent className='text-sm font-medium'>{board.name}</TooltipContent>
                                    )}
                                </Tooltip>
                            </TooltipProvider>
                        </Link>
                    </Button>
                    <div className='text-sm text-gray-500'>
                        Создано: {new Date(board.createdAt).toLocaleDateString()}
                    </div>
                    <div className='text-sm text-gray-500'>
                        Последнее открытие: {new Date(board.lastOpenedAt).toLocaleDateString()}
                    </div>
                </div>
            </CardHeader>
            {bottomActions && <CardFooter>{bottomActions}</CardFooter>}
        </Card>
    )
}
