import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/kit/card.tsx'

export function AuthLayout({
    form,
    title,
    description,
    footer,
}: {
    form: React.ReactNode
    title: React.ReactNode
    description: React.ReactNode
    footer: React.ReactNode
}) {
    return (
        <main className='grow flex flex-col pt-[10rem] items-center'>
            <Card className='w-full max-w-[20rem]'>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>{form}</CardContent>
                <CardFooter>
                    <p className='text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary'>{footer}</p>
                </CardFooter>
            </Card>
        </main>
    )
}
