import { ArrowRightIcon, StickerIcon } from 'lucide-react'
import { useNodesRects } from '@/features/board/hooks/use-nodes-rects.ts'
import { useCanvasRect } from './hooks/use-canvas-rect.ts'
import { useLayoutFocus } from './hooks/use-layout-focus.ts'
import { useWindowEvents } from './hooks/use-window-events.ts'
import { useNodes } from './model/use-nodes.ts'
import { ActionButton } from './ui/ActionButton.tsx'
import { Actions } from './ui/Actions.tsx'
import { Canvas } from './ui/Canvas.tsx'
import { Dots } from './ui/Dots.tsx'
import { Layout } from './ui/Layout.tsx'
import { Overlay } from './ui/Overlay.tsx'
import { SelectionWindow } from './ui/SelectionWindow.tsx'
import { Sticker } from './ui/Sticker.tsx'
import { useViewModel } from './view-model/use-view-model.ts'

function BoardPage() {
    const nodesModel = useNodes()
    const { canvasRef, canvasRect } = useCanvasRect()
    const { layoutRef } = useLayoutFocus()
    const { nodeRef, nodesRects } = useNodesRects()
    const viewModel = useViewModel({ nodesModel, canvasRect, nodesRects })
    useWindowEvents(viewModel)

    return (
        <Layout tab-index={0} ref={layoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
            <Dots />
            <Canvas ref={canvasRef} onClick={viewModel.canvas?.onClick}>
                <Overlay onClick={viewModel.overlay?.onClick} onMouseDown={viewModel.overlay?.onMouseDown} />
                {viewModel?.nodes?.map((node) => (
                    <Sticker
                        ref={nodeRef}
                        id={node.id}
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
                    title='Добавить стикер (Ctrl+S)'
                    isActive={viewModel.actions?.addSticker?.isActive}
                    onClick={viewModel.actions?.addSticker?.onClick}
                >
                    <StickerIcon />
                </ActionButton>
                <ActionButton title='Добавить стрелку (Ctrl+A)' isActive={false} onClick={() => {}}>
                    <ArrowRightIcon />
                </ActionButton>
            </Actions>
        </Layout>
    )
}

export const Component = BoardPage
