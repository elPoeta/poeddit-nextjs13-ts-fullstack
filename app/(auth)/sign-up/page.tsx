import Auth from '@/components/auth/Auth'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Register',
  description: 'Register to poeddit with your github account',
}

const RegisterPage = () => {
  return (
    <div className='absolute inset-0'>
      <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
        <Link
          href='/'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'self-start -mt-20'
          )}>
          <ChevronLeft className='mr-2 h-4 w-4' />
          Home
        </Link>

        <Auth isSignIn={false} />
      </div>
    </div>
  )
}

export default RegisterPage