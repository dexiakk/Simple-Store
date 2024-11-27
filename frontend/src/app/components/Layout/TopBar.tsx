import Image from "next/image"
import Link from "next/link"

export default function TopBar() {
    return (
        <div className="w-full flex justify-between bg-[#F7F7F7] px-10 text-black">
            <Image src={"/img/blackLogo.png"} width={25} height={25} style={{width: 25, height: 25}} alt="logo" />
            <Link href={"/help"}>
                <span className="text-[14px]">Pomoc</span>
            </Link>
        </div>
    )
}