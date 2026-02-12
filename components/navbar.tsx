import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className='border-b border-gray-200 bg-white'>
      <div className='container mx-auto flex h-16 justify-between items-center p-4'>
        <Link href={"/"} className='flex items-center gap-2 text-xl font-semibold text-primary'>
            <Briefcase />
            Job Tracker
        </Link>
        <div className='flex items-center gap-4'>
            <Link href={"/sign-in"}>
                <Button variant={"ghost"}  className='text-gray-700 cursor-pointer hover:text-black'>Log in</Button>
            </Link>
            <Link href={"/sign-up"}>
                <Button className='bg-primary cursor-pointer hover:bg-primary/90 hover:text-black'>Start for free</Button>
            </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
