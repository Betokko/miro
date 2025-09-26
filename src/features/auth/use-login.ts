import { useNavigate } from 'react-router-dom'
import { rqClient } from '@/shared/api/instance.ts'
import type { ApiSchemas } from '@/shared/api/schema'
import { ROUTES } from '@/shared/model/routes.tsx'

export function useLogin() {
    const navigate = useNavigate()

    const { mutate, isPending, error } = rqClient.useMutation('post', '/auth/login', {
        onSuccess: () => {
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
