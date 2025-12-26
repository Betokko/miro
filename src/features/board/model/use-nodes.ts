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
    const [nodes, setState] = useState<Node[]>([])

    const addSticker = (data: Pick<StickerNode, 'text' | 'x' | 'y'>) => {
        const node: StickerNode = { id: crypto.randomUUID(), type: 'sticker', ...data }
        setState((prev) => [...prev, node])
    }
    return {
        nodes,
        addSticker,
    }
}

export type NodesModel = ReturnType<typeof useNodes>
