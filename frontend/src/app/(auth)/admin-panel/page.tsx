"use client"
import OrdersList from '@/app/components/Admin/OrdersList'
import EditUserPhoto from '@/app/components/UserDetails/EditUserPhoto'
import LogoutButton from '@/app/components/UserDetails/LogoutButton'
import { getLoggedInUser, getOrdersList, getQuestionsList } from '@/lib/userActions'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionsList from '@/app/components/Admin/QuestionsList'

export default function page() {
  const [user, setUser] = useState<UserProps | null>()
  const [ordersList, setOrdersList] = useState()
  const [questionsList, setQuestionsList] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLoggedInUser()

      setUser(user)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrdersList()

      setOrdersList(orders)
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getQuestionsList()

      setQuestionsList(questions)
    }

    fetchQuestions()
  }, [])

  console.log(questionsList)

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[90%] sm:w-[70%] md:w-[60%] flex justify-between'>
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
        <div className='hidden sm:flex'>
          <EditUserPhoto />
        </div>
      </div>
      <div className='my-3'>

        <Tabs defaultValue="users-orders" className='w-full mt-4'>
          <TabsList className='w-full justify-center bg-white'>
            <div className='pb-7 flex gap-3'>
              <TabsTrigger value="users-orders" className='text-[20px] border-2'>Users Orders</TabsTrigger>
              <TabsTrigger value="users-questions" className='text-[20px] border-2'>Users Questions</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="users-orders" className='w-full'>
            {ordersList && (
              <OrdersList orders={ordersList} admin={user} />
            )}
          </TabsContent>
          <TabsContent value="users-questions">
            {questionsList && (
              <div className="max-w-[100vw]">
                <QuestionsList questionsList={questionsList} admin={user} />
              </div>
            )}
          </TabsContent>
        </Tabs>



      </div>
      <LogoutButton />
    </div>
  )
}
