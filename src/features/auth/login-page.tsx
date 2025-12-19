import { Link } from 'react-router-dom'
import { AuthLayout } from '@/features/auth/auth-layout.tsx'
import { LoginForm } from '@/features/auth/login-form.tsx'
import { ROUTES } from '@/shared/model/routes.tsx'

function LoginPage() {
    return (
        <AuthLayout
            title={'Вход в систему'}
            description={'Введите ваш email и пароль для входа в систему'}
            form={<LoginForm />}
            footer={
                <>
                    Нет аккаунта ? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
                </>
            }
        />
    )
}

export const Component = LoginPage
