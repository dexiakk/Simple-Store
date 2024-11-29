import Image from 'next/image'
import React from 'react'

export default function AboutUsMobileContent() {
    return (
        <div className='mt-10 block md:hidden'>
            <div className='flex flex-col items-center'>
                <Image src={"/img/about-us.png"} width={180} height={180} alt="about-us" />
                <span className='text-center mt-2 px-7'>
                    With a passion for footwear and a commitment to excellence,
                    <span className="font-bold">Simple Store </span>
                    steps into the world of fashion as a fresh and dynamic online store.
                    Though we're just starting out and don't yet have physical locations,
                    our vision is clear: to deliver the latest trends, premium quality,
                    and trusted brands to shoe lovers everywhere.
                </span>
            </div>

            <div className='w-screen my-8'>
                <div className="relative w-screen h-[80px]">
                    <Image src={"/img/banner.png"} fill className="object-cover z-0" alt="banner" />
                </div>
            </div>

            

            <div className='flex flex-col items-center'>
                <span className='font-bold text-xl'>"Walk Your Way."</span>
                <span className='text-center px-7'>
                    With a passion for footwear and a commitment to excellence,
                    <span className="font-bold">Simple Store </span>
                    steps into the world of fashion as a fresh and dynamic online store.
                    Though we're just starting out and don't yet have physical locations,
                    our vision is clear: to deliver the latest trends, premium quality,
                    and trusted brands to shoe lovers everywhere.
                </span>
            </div>

            <div className='flex justify-center gap-2 mt-7'>
                <Image src={"/img/redJordan.png"} width={140} height={140} alt='redJordan' className='scale-x-[-1]' />
                <Image src={"/img/purpleJordan.png"} width={140} height={140} alt='purpleJordan' />
            </div>

            
        </div>
    )
}
