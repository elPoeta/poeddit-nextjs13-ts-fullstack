
import Link from "next/link"
import { Icons } from "../icons/Icons"
import SearchBar from "./SearchBar"
import { buttonVariants } from "../ui/Button"
import ToggleTheme from "./ToggleTheme"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import UserAccountNav from "../user/UserAccountNav"


const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <nav className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
      <Link href='/' className='flex gap-2 items-center'>
        <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
        <p className='hidden text-lg font-medium md:block'>poeddit</p>
      </Link>

      <SearchBar />

      <div className="flex items-center justify-center gap-2">
        <ToggleTheme />
        {session && session?.user ? (
           <UserAccountNav user={session.user} />
          ) : (
            <Link href='/sign-in' className={buttonVariants()}>Sign In</Link>
          )

        } 
        
      </div> 
    
    </nav>
  )
}

export default Navbar