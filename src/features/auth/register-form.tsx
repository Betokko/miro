import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRegister } from '@/features/auth/use-register.ts'
import { Button } from '@/shared/ui/kit/button.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/kit/form'
import { Input } from '@/shared/ui/kit/input'

const registerSchema = z
    .object({
        email: z.email('Введите корректный email'),
        password: z.string().min(1, 'Введите пароль').min(6, 'Пароль не может быть короче 6 символов'),
        confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Пароли не совпадают',
    })

export const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: '', password: '' },
    })

    const { register, isPending, errorMessage } = useRegister()

    const handleSubmit = form.handleSubmit(register)

    return (
        <Form {...form}>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Логин</FormLabel>
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
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Подтвердите пароль</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {errorMessage && <p className='text-destructive text-sm'>{errorMessage}</p>}
                <Button disabled={isPending} type='submit'>
                    Зарегистрироваться
                </Button>
            </form>
        </Form>
    )
}
