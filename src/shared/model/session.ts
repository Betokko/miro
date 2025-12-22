import { createGStore } from 'create-gstore'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { publicFetchClient } from '@/shared/api/instance.ts'
import type { ApiSchemas } from '@/shared/api/schema'

type Session = ApiSchemas['User'] & {
    exp: number
    iat: number
}

const TOKEN_KEY = 'token'

export const useSession = createGStore(() => {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))

    const login = (token: string) => {
        localStorage.setItem(TOKEN_KEY, token)
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
    }

    const session = token ? jwtDecode<Session>(token) : null

    const refreshToken = async () => {
        let refreshTokenPromise: Promise<string | null> | null = null

        if (!token) return null

        const isExpired = jwtDecode<Session>(token).exp < Date.now() / 1000 + 1

        if (!isExpired) return token

        if (!refreshTokenPromise) {
            refreshTokenPromise = publicFetchClient
                .POST('/auth/refresh')
                .then((response) => response.data?.accessToken ?? null)
                .then((token) => {
                    token ? login(token) : logout()
                    return token
                })
                .finally(() => {
                    refreshTokenPromise = null
                })
        }

        return refreshTokenPromise
    }

    return { login, logout, session, refreshToken }
})
