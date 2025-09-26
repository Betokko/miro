import { useNavigate } from 'react-router-dom'
import { rqClient } from '@/shared/api/instance.ts'
import type { ApiSchemas } from '@/shared/api/schema'
import { ROUTES } from '@/shared/model/routes.tsx'

export function useRegister() {
    const navigate = useNavigate()

    const { mutate, isPending, error } = rqClient.useMutation('post', '/auth/register', {
        onSuccess: () => {
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
