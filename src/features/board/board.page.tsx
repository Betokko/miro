import { clsx } from 'clsx'
import { ArrowRightIcon, StickerIcon } from 'lucide-react'
import { useWindowEvents } from '@/features/board/hooks/use-window-events.ts'
import { Button } from '@/shared/ui/kit/button.tsx'
import type { Rect } from './domain/rect.ts'
import { useCanvasRect } from './hooks/use-canvas-rect.ts'
import { useLayoutFocus } from './hooks/use-layout-focus.ts'
import { useNodes } from './model/use-nodes.ts'
import { useViewModel } from './view-model/use-view-model.ts'

function BoardPage() {
    const nodesModel = useNodes()
    const { canvasRect, canvasRef } = useCanvasRect()
    const { layoutRef } = useLayoutFocus()
    const viewModel = useViewModel({ nodesModel, canvasRect })
    useWindowEvents(viewModel)

    return (
        <Layout tab-index={0} ref={layoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
            <Dots />
            <Canvas ref={canvasRef} onClick={viewModel.canvas?.onClick}>
                <Overlay onClick={viewModel.overlay?.onClick} onMouseDown={viewModel.overlay?.onMouseDown} />
                {viewModel?.nodes?.map((node) => (
                    <Sticker
                        key={node.id}
                        text={node.text}
                        x={node.x}
                        y={node.y}
                        selected={node.isSelected}
                        onClick={node.onClick}
                    />
                ))}
            </Canvas>
            {viewModel.selectionWindow && <SelectionWindow {...viewModel.selectionWindow} />}
            <Actions>
                <ActionButton
                    isActive={viewModel.actions?.addSticker?.isActive}
                    onClick={viewModel.actions?.addSticker?.onClick}
                >
                    <StickerIcon />
                </ActionButton>
                <ActionButton isActive={false} onClick={() => {}}>
                    <ArrowRightIcon />
                </ActionButton>
            </Actions>
        </Layout>
    )
}

export const Component = BoardPage

function SelectionWindow({ width, height, y, x }: Rect) {
    return (
        <div
            className='absolute inset-0 border-2 bg-indigo-600/25 border-indigo-600 z-200'
            style={{ transform: `translate(${x}px, ${y}px)`, width, height }}
        />
    )
}

function Overlay({
    onClick,
    onMouseDown,
    onMouseUp,
}: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
}) {
    return <div className='absolute inset-0' onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
}

function Layout({
    children,
    ref,
    ...props
}: {
    children: React.ReactNode
    ref: React.Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className='grow relative' tabIndex={0} ref={ref} {...props}>
            {children}
        </div>
    )
}

function Dots() {
    return (
        <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]' />
    )
}

function Canvas({
    children,
    ref,
    ...props
}: {
    children: React.ReactNode
    ref: React.Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className='absolute inset-0' ref={ref} {...props}>
            {children}
        </div>
    )
}

function Sticker({
    text,
    x,
    y,
    onClick,
    selected,
}: {
    text: string
    x: number
    y: number
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    selected?: boolean
}) {
    return (
        <button
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

function Actions({ children }: { children: React.ReactNode }) {
    return (
        <div className='absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white p-1 rounded-md shadow'>
            {children}
        </div>
    )
}

function ActionButton({
    children,
    isActive,
    onClick,
}: {
    children: React.ReactNode
    isActive?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <Button
            variant='ghost'
            size='icon'
            className={isActive ? 'bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600' : ''}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}
