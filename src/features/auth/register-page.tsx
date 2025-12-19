import { Link } from 'react-router-dom'
import { AuthLayout } from '@/features/auth/auth-layout.tsx'
import { RegisterForm } from '@/features/auth/register-form.tsx'
import { ROUTES } from '@/shared/model/routes.tsx'

function RegisterPage() {
    return (
        <AuthLayout
            title={'Регистрация'}
            description={'Введите ваш email и пароль для регистрации в систему'}
            form={<RegisterForm />}
            footer={
                <>
                    Есть аккаунт ? <Link to={ROUTES.LOGIN}>Войти</Link>
                </>
            }
        />
    )
}

export const Component = RegisterPage
