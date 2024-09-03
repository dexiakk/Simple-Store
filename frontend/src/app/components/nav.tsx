'use client'
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Nav({ navColor }: { navColor: string }) {

  const [hamburgerState, changeHamburgerState] = useState('bar')

  const pathName = usePathname();

  const hamburgerFunction = () => {
    hamburgerState === 'bar' ? changeHamburgerState('changedBar') : changeHamburgerState('bar')
  }

  return (
    <nav className="flex justify-between relative z-50">
      <div className="hidden md:block">
        <Image src={navColor == "white" ? "/img/logo.png" : "/img/blackLogo.png"} alt="logo" width={navColor === "white" ? 130 : 70} height={130} />
      </div>
      <div className="flex md:hidden">
        <Image src={navColor == "white" ? "/img/logo.png" : "/img/blackLogo.png"} alt="logo" width={80} height={80} />
      </div>
      <div className="flex items-center">
        <ul className="text-[14px] md:text-[16px] flex gap-6 mobile:gap-10 font-medium">
            <Link href='..'><li className={`${pathName.endsWith("/") ? "pb-[1px] border-b-[2px] border-white" : `text-${navColor}`} hidden mobile:block`}>Get Started!</li></Link>
            <li className={`${pathName.endsWith("/producdsats") ? "text-black border-b-[2px] border-black" : `text-${navColor}`}`}>Sales</li>
            <Link href='./products'><li className={`${pathName.endsWith("/products") ? "pb-[1px] text-black border-b-[2px] border-black" : `text-${navColor}`}`}>Products</li></Link>
            <li className={`${pathName.endsWith("/productfds") ? "text-black border-b-[2px] border-black" : `text-${navColor}`} hidden md:block`}>FAQ</li>
            <li className={`${pathName.endsWith("/productfds") ? "text-black border-b-[2px] border-black" : `text-${navColor}`} hidden md:block`}>About Us</li>
        </ul>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Image src={navColor == "white" ? "/img/user.svg" : "/img/blackUser.svg"} alt="user" width={22} height={22} />
        <Image src={navColor == "white" ? "/img/cart.svg" : "/img/blackCart.svg"} alt="user" width={30} height={30} />
      </div>
      <div className="flex md:hidden items-center gap-3 ml-5">
        <div className="z-10 flex ">
          <div onClick={hamburgerFunction}>
            <div className={`${hamburgerState}1 bar1`}></div>
            <div className={`${hamburgerState}2 bar2`}></div>
            <div className={`${hamburgerState}3 bar3`}></div>
          </div>
        </div>
      </div>
    </nav>
  );
}