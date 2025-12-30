import { useState } from 'react'

type NodeBase<T extends 'sticker'> = {
    id: string
    type: T
}

type StickerNode = NodeBase<'sticker'> & {
    x: number
    y: number
    text: string
}

export type Node = StickerNode

export function useNodes() {
    const [nodes, setNodes] = useState<Node[]>([
        { id: '1', y: 100, x: 100, text: 'HELLO_1', type: 'sticker' },
        { id: '2', y: 200, x: 200, text: 'HELLO_2', type: 'sticker' },
    ])

    const addSticker = (data: Pick<StickerNode, 'text' | 'x' | 'y'>) => {
        setNodes((prev) => [...prev, { id: crypto.randomUUID(), type: 'sticker', ...data }])
    }

    const deleteNodes = (ids: string[]) => {
        setNodes((prev) => prev.filter((node) => !ids.includes(node.id)))
    }

    return {
        nodes,
        addSticker,
        deleteNodes,
    }
}

export type NodesModel = ReturnType<typeof useNodes>
