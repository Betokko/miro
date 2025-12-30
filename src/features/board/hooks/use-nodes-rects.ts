import { type RefCallback, useCallback, useEffect, useRef, useState } from 'react'

export type NodesRect = {
    width: number
    height: number
}

export type NodesRectsMap = Record<string, NodesRect>

export function useNodesRects() {
    const [nodesRects, setNodesRects] = useState<NodesRectsMap>({})

    const resizeObserverRef = useRef<ResizeObserver | undefined>(undefined)

    const nodeRef: RefCallback<Element> = useCallback((element) => {
        if (!resizeObserverRef.current) {
            resizeObserverRef.current = new ResizeObserver((entries) => {
                const nodesToUpdate = Object.fromEntries(
                    entries
                        .map((entry) => [
                            (entry.target as HTMLElement).dataset.id,
                            {
                                width: entry.borderBoxSize[0].inlineSize,
                                height: entry.borderBoxSize[0].blockSize,
                            },
                        ])
                        .filter((entry) => !!entry[0]),
                )

                setNodesRects((prev) => ({ ...prev, ...nodesToUpdate }))
            })
        }

        const resizeObserver = resizeObserverRef.current

        if (element) {
            resizeObserver.observe(element)
            return () => {
                setNodesRects((prev) => {
                    const newNodesRects = { ...prev }
                    delete newNodesRects[(element as HTMLElement).dataset.id ?? '']
                    return newNodesRects
                })
                resizeObserver.unobserve(element)
            }
        }
    }, [])

    useEffect(() => {
        return () => {
            resizeObserverRef.current?.disconnect()
        }
    }, [])

    return { nodeRef, nodesRects }
}
