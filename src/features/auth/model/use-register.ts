import { useNavigate } from 'react-router-dom'
import { publicRqClient } from '@/shared/api/instance.ts'
import type { ApiSchemas } from '@/shared/api/schema'
import { ROUTES } from '@/shared/model/routes.tsx'
import { useSession } from '@/shared/model/session.ts'

export function useRegister() {
    const navigate = useNavigate()
    const session = useSession()

    const { mutate, isPending, error } = publicRqClient.useMutation('post', '/auth/register', {
        onSuccess: (data) => {
            session.login(data.accessToken)
            navigate(ROUTES.HOME)
        },
    })

    const register = (body: ApiSchemas['LoginRequest']) => {
        mutate({ body })
    }

    return {
        register,
        isPending,
        errorMessage: error?.message,
    }
}
