"use client"
import api from '@/lib/api'
import { useEffect, useState } from 'react'

export default function page() {

  // const [buty, setButy] = useState(null)

  // const getButy = async () => {
  //   try {
  //     const butyx = await api.get("/api/shoeslist/")

  //     return butyx.data;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // useEffect(() => {
  //   const fetchButy = async () => {
  //     const noweButy = await getButy()

  //     setButy(noweButy)
  //   }

  //   fetchButy()
  // }, [])

  // console.log(buty)

  return (
    <div className='bg-gray-700 w-full h-screen text-[94px] text-white text-center'>

      SIEMA

    </div>
  )
}
