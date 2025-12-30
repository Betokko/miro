import { Button } from '@/shared/ui/kit/button.tsx'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/kit/tooltip.tsx'

export function ActionButton({
    children,
    isActive,
    onClick,
    title,
}: {
    children: React.ReactNode
    isActive?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    title?: string
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant='ghost'
                        size='icon'
                        className={
                            isActive ? 'bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600' : ''
                        }
                        onClick={onClick}
                    >
                        {children}
                    </Button>
                </TooltipTrigger>
                {title && <TooltipContent className='text-sm font-medium'>{title}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    )
}
