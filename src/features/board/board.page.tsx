import { clsx } from 'clsx'
import { ArrowRightIcon, StickerIcon } from 'lucide-react'
import { Button } from '@/shared/ui/kit/button.tsx'
import { useCanvasRect } from './hooks/use-canvas-rect.ts'
import { useLayoutFocus } from './hooks/use-layout-focus.ts'
import { useNodes } from './model/use-nodes.ts'
import { useViewState } from './model/use-view-state.ts'
import { useViewModel } from './view-model/use-view-model.ts'

function BoardPage() {
    const nodesModel = useNodes()
    const viewStateModel = useViewState()
    const { canvasRef, canvasRect } = useCanvasRect()
    const { layoutRef } = useLayoutFocus()

    const viewModal = useViewModel({ nodesModel, viewStateModel, canvasRect })

    return (
        <Layout tab-index={0} ref={layoutRef} onKeyDown={viewModal.layout?.onKeyDown}>
            <Dots />
            <Canvas ref={canvasRef} onClick={viewModal.canvas?.onClick}>
                <Overlay
                    onClick={viewModal.overlay?.onClick}
                    onMouseDown={viewModal.overlay?.onMouseDown}
                    onMouseUp={viewModal.overlay?.onMouseUp}
                />
                {viewModal?.nodes?.map((node) => (
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
            <Actions>
                <ActionButton
                    isActive={viewModal.actions?.addSticker?.isActive}
                    onClick={viewModal.actions?.addSticker?.onClick}
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
                'absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md',
                selected && 'outline outline-blue-500',
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
