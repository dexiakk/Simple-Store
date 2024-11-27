"use client"
import OrdersList from '@/app/components/Admin/OrdersList'
import EditUserPhoto from '@/app/components/UserDetails/EditUserPhoto'
import LogoutButton from '@/app/components/UserDetails/LogoutButton'
import { getLoggedInUser, getOrdersList } from '@/lib/userActions'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function page() {
  const [user, setUser] = useState<UserProps | null>()
  const [ordersList, setOrdersList] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLoggedInUser()

      setUser(user)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const orders = await getOrdersList()

      setOrdersList(orders)
    }

    fetchUser()
  }, [])

  console.log(ordersList)

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[60%] flex justify-between'>
        <div className='flex items-center'>
          <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
            {user?.avatar ? (
              <Image src={`${user.avatar}?t=${new Date().getTime()}`} fill
                sizes="(max-width: 120px) 100vw, 50vw" alt="userAvatar" className="object-cover" priority={true} />
            ) : (
              <Image src={"/img/blackUser.svg"} fill sizes="(max-width: 120px) 100vw, 50vw" alt="userBlackAvatar" className="object-contain p-8" />
            )}
          </div>
          <div className='flex flex-col ml-5'>
            <span className='text-[18px] font-bold'>Admin</span>
            <span className='text-[17px]'>{user?.firstName}&nbsp;{user?.lastName}</span>
            <span className='font-bold'>{user?.username}</span>
          </div>
        </div>
        <EditUserPhoto />
      </div>
      <div>
        {ordersList && (
          <OrdersList orders={ordersList} />
        )}
      </div>
      <LogoutButton />
    </div>
  )
}
