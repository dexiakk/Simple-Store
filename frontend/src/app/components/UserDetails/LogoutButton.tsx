import { Button } from '@/components/ui/button'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)

        router.push('/')
    }
    return (
        <Button onClick={handleLogout} className='px-12 py-6 text-[17px] mt-2 mb-5'>Wyloguj się</Button>
    )
}
