import Image from "next/image"

export default function TopBar() {
    return (
        <div className="w-full flex justify-between bg-[#F7F7F7] px-10 text-black">
           <Image src={"/img/blackLogo.png"} width={25} height={25} alt="logo"/> 
           <span className="text-[14px]">Pomoc</span>
        </div>
    )
}