import { createBrowserRouter, redirect } from 'react-router-dom'
import { Providers } from '@/app/providers.tsx'
import { ROUTES } from '../shared/model/routes.tsx'
import { App } from './app.tsx'

export const router = createBrowserRouter([
    {
        element: (
            <Providers>
                <App />
            </Providers>
        ),
        children: [
            {
                path: ROUTES.BOARDS,
                lazy: () => import('@/features/boards-list/boards-list.page.tsx'),
            },
            {
                path: ROUTES.BOARD,
                lazy: () => import('@/features/board/board.page.tsx'),
            },
            {
                path: ROUTES.LOGIN,
                lazy: () => import('@/features/auth/login.page.tsx'),
            },
            {
                path: ROUTES.REGISTER,
                lazy: () => import('@/features/auth/register.page.tsx'),
            },
            {
                path: ROUTES.HOME,
                loader: () => redirect(ROUTES.BOARDS),
            },
        ],
    },
])
