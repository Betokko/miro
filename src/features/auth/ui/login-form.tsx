import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLogin } from '@/features/auth/model/use-login.ts'
import { Button } from '@/shared/ui/kit/button.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/kit/form'
import { Input } from '@/shared/ui/kit/input'

const loginSchema = z.object({
    email: z.email('Введите корректный email'),
    password: z.string().min(1, 'Введите пароль').min(6, 'Пароль не может быть короче 6 символов'),
})

export const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    })

    const { login, isPending, errorMessage } = useLogin()

    const handleSubmit = form.handleSubmit(login)

    const autoLogin = () => {
        login({ email: 'admin@gmail.com', password: '123456' })
    }

    return (
        <Form {...form}>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='email@mail.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='******' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {errorMessage && <p className='text-destructive text-sm'>{errorMessage}</p>}
                <Button disabled={isPending} type='submit'>
                    Войти
                </Button>
            </form>
            <Button className='mt-4 w-full' type='submit' variant='ghost' onClick={autoLogin}>
                Войти без регистрации
            </Button>
        </Form>
    )
}
