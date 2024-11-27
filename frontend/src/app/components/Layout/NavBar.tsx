'use client'
import NavList from "./NavList";
import Image from "next/image";
import Link from "next/link";
import NavBarIcons from "./NavBarIcons";
import MobileNav from "./MobileNav";

export default function NavBar({ color }: { color: String }) {

    return (
        <nav className={`flex justify-between items-center ${color === "white" && "text-white"}`}>
            <div>
                {color === "white" ? (
                    <Link href={"/"}>
                        <Image src={"/img/logo.png"} alt="logo" width={130} height={130} />
                    </Link>
                ) : (
                    <Link href={"/"}>
                        <Image src={"/img/blackLogo.png"} alt="logo" width={70} height={70}/>
                    </Link>
                )}
            </div>
            <NavList color={color} />
            <div className="hidden md:block">
                <NavBarIcons
                    color={color}
                    size="normal"
                />
            </div>
            <MobileNav color={color} />

        </nav>
    )
}
