import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { navBarLinks } from '../../constans'

export default function NavList({ color }: { color: String }) {
    const pathName = usePathname()
    return (
        <div className={`hidden md:flex gap-9 lg:gap-11 font-medium text-[14px] md:text-[16px]`}>
            {navBarLinks.map((item) => {
                return (
                    <div key={item.route} className={`${pathName.endsWith(item.route) && "border-b-[2px]"} border-${color}`}>
                        <Link href={item.route}>
                            {item.label}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
