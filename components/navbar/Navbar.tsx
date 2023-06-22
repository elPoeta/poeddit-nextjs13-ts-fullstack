
import Link from "next/link"
import { Icons } from "../icons/Icons"
import SearchBar from "./SearchBar"
import { buttonVariants } from "../ui/Button"
import ToggleTheme from "./ToggleTheme"


const Navbar = () => {
  return (
    <nav className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
      <Link href='/' className='flex gap-2 items-center'>
        <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
        <p className='hidden dark:text-gray-50 text-zinc-700 text-lg font-medium md:block'>poeddit</p>
      </Link>

      <SearchBar />

      <div className="flex items-center justify-center">
        <ToggleTheme />
        <Link href='/sign-in' className={buttonVariants()}>Sign In</Link>
      </div> 
    
    </nav>
  )
}

export default Navbar