import { href, Link } from 'react-router-dom'
import { ROUTES } from '@/shared/model/routes.tsx'
import { useSession } from '@/shared/model/session'
import { Button } from '@/shared/ui/kit/button'

export function AppHeader() {
    const { session, logout } = useSession()
    if (!session) return null

    return (
        <header className='bg-background border-b border-border/40 shadow-sm py-3 px-4'>
            <div className='max-w-7xl mx-auto flex items-center justify-between'>
                <Button asChild variant='link' className='hover:no-underline text-xl font-semibold'>
                    <Link to={href(ROUTES.HOME)}>Miro Copy</Link>
                </Button>
                <div className='flex items-center gap-4'>
                    <span className='text-sm text-muted-foreground'>{session.email}</span>
                    <Button variant='outline' size='sm' onClick={() => logout()} className='hover:bg-destructive/10'>
                        Выйти
                    </Button>
                </div>
            </div>
        </header>
    )
}
