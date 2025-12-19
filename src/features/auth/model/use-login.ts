import { useNavigate } from 'react-router-dom'
import { publicRqClient } from '@/shared/api/instance.ts'
import type { ApiSchemas } from '@/shared/api/schema'
import { ROUTES } from '@/shared/model/routes.tsx'
import { useSession } from '@/shared/model/session.ts'

export function useLogin() {
    const navigate = useNavigate()
    const session = useSession()

    const { mutate, isPending, error } = publicRqClient.useMutation('post', '/auth/login', {
        onSuccess: (data) => {
            session.login(data.accessToken)
            navigate(ROUTES.HOME)
        },
    })

    const login = (body: ApiSchemas['LoginRequest']) => {
        mutate({ body })
    }

    return {
        login,
        isPending,
        errorMessage: error?.message,
    }
}
