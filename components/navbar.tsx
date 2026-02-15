"use client";
import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { getSession, signOut } from '@/lib/auth/auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import SignOutBtn from './sign-out-btn'
import { useSession } from '@/lib/auth/auth-client';

const Navbar = () => {

  const { data: session } = useSession();

  return (
    <nav className='border-b border-gray-200 bg-white'>
      <div className='container mx-auto flex h-16 justify-between items-center p-4'>
        <Link href={"/"} className='flex items-center gap-2 text-xl font-semibold text-primary'>
            <Briefcase />
            Job Tracker
        </Link>
        <div className='flex items-center gap-4'>
          {
            session?.user ? 
            <>
              <Link href={"/dashboard"}>
                <Button
                  variant={"ghost"}
                  className='text-gray-700 cursor-pointer hover:text-black'
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant={"ghost"}
                    className='relative h-8 w-8 rounded-full'
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarFallback
                        className='bg-primary text-white'
                      >
                        {session.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-56' align='end'>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {session.user.name}
                      </p>
                    </div>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {session.user.email}
                    </p>
                  </DropdownMenuLabel>
                  <SignOutBtn/>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
            :
            <>
              <Link href={"/sign-in"}>
                <Button variant={"ghost"}  className='text-gray-700 cursor-pointer hover:text-black'>Log in</Button>
              </Link>
              <Link href={"/sign-up"}>
                  <Button className='bg-primary cursor-pointer hover:bg-primary/90 hover:text-black'>Start for free</Button>
              </Link>
            </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
