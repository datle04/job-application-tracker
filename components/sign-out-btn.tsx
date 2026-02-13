'use client';
import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu';
import { signOut } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const SignOutBtn = () => {
    const router = useRouter()
  return (
    <DropdownMenuItem
        onClick={async () => {
            toast.promise(
                signOut(), // Tắt tự động redirect của NextAuth để toast kịp chạy
                {
                    loading: 'Signing out...',
                    success: () => {
                        router.push('/sign-in'); // Redirect thủ công
                        return <b>Signed out successfully!</b>;
                    },
                    error: <b>Something went wrong</b>,
                }
            );
        }}
    >
        Log Out
    </DropdownMenuItem>
  )
}

export default SignOutBtn
