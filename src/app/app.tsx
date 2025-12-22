import { Outlet } from 'react-router-dom'
import { Providers } from '@/app/providers.tsx'

export function App() {
    return (
        <Providers>
            <div className={'min-h-screen flex flex-col'}>
                <Outlet />
            </div>
        </Providers>
    )
}
