import { Navigate, Outlet, redirect } from 'react-router-dom'
import { enableMocking } from '@/shared/api/mocks'
import { ROUTES } from '@/shared/model/routes.tsx'
import { useSession } from '@/shared/model/session'

export function ProtectedRoute() {
    const { session } = useSession()
    if (!session) {
        return <Navigate to={ROUTES.LOGIN} />
    }
    return <Outlet />
}

export async function protectedLoader() {
    await enableMocking()
    const token = await useSession.getState().refreshToken()
    if (!token) {
        return redirect(ROUTES.LOGIN)
    }
    return null
}
