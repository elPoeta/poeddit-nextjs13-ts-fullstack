
import Link from "next/link";
import { FC } from "react"
import { Icons } from "../icons/Icons";
import UserAuthForm from "./UserAuthForm";

export interface AuthProps extends React.HTMLAttributes<HTMLDivElement> {
  isSignIn: boolean;
}

const Auth:FC<AuthProps> = ({ className, isSignIn }) => {
  const title = isSignIn ? 'Welcome back' : 'Sign Up'
  const goTo = isSignIn ? '/sign-up' : '/sign-in'
  const linkTitle = isSignIn ? 'Sign Up' : 'Sign In'
  const linkLabel = isSignIn ? 'New to poeddit?' : 'Already a poedditor?'
  
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.logo className='mx-auto h-6 w-6' />
        <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm className={className}/>
      <p className='px-8 text-center text-sm text-muted-foreground'>
        {linkLabel}{' '}
        <Link
          href={goTo}
          className='hover:text-brand text-sm underline underline-offset-4'>
          {linkTitle}
        </Link>
      </p>
    </div>
  )
}

export default Auth