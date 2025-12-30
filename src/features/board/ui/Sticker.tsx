import clsx from 'clsx'
import type { Ref } from 'react'

export function Sticker({
    id,
    text,
    x,
    y,
    onClick,
    selected,
    ref,
}: {
    id: string
    text: string
    x: number
    y: number
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    selected?: boolean
    ref: Ref<HTMLButtonElement>
}) {
    return (
        <button
            data-id={id}
            ref={ref}
            onClick={onClick}
            className={clsx(
                `absolute bg-yellow-200 p-2 shadow-md box-border`,
                selected && 'outline-2 outline-blue-500 outline-offset-4 z-100',
            )}
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            {text}
        </button>
    )
}
