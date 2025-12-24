import { keepPreviousData } from '@tanstack/query-core'
import { type RefCallback, useCallback } from 'react'
import { rqClient } from '@/shared/api/instance'
import type { ApiSchemas } from '@/shared/api/schema'

type UseBoardsListParams = {
    limit?: number
    isFavorite?: boolean
    search?: string
    sort?: 'createdAt' | 'updatedAt' | 'lastOpenedAt' | 'name'
}

export function useBoardsList({ limit = 20, isFavorite, search, sort }: UseBoardsListParams) {
    const { data, fetchNextPage, isPending, hasNextPage, isFetchingNextPage } = rqClient.useInfiniteQuery(
        'get',
        '/boards',
        {
            params: {
                query: {
                    page: 1,
                    limit,
                    isFavorite,
                    search,
                    sort,
                },
            },
        },
        {
            initialPageParam: 1,
            pageParamName: 'page',
            getNextPageParam: (lastPage: ApiSchemas['BoardsList'], _allPages: unknown, lastPageParam: number) =>
                Number(lastPageParam) < lastPage.totalPages ? Number(lastPageParam) + 1 : null,
            placeholderData: keepPreviousData,
        },
    )

    const ref: RefCallback<HTMLDivElement> = useCallback(
        (el) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        fetchNextPage()
                    }
                },
                { threshold: 0.5 },
            )

            if (el) {
                observer.observe(el)
                return () => observer.disconnect()
            }
        },
        [fetchNextPage],
    )

    const boards = data?.pages.flatMap((page) => page.list) ?? []

    return {
        boards,
        fetchNextPage,
        ref,
        isPending,
        hasNextPage,
        isFetchingNextPage,
    }
}
