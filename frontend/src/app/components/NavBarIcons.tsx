import Link from 'next/link'
import Image from 'next/image'

export default function NavBarIcons({ color, size }: NavBarIconProps) {
    let userIconSize:number = 22;
    let cartIconSize:number = 30;
    let gap:String = "gap-3";

    size === "xl" && (
        userIconSize = 35,
        cartIconSize = 46,
        gap = "gap-7"
    )

    return (
        <div>
            {color === "white" ? (
                <div className={`flex items-center ${gap}`}>

                    <Link href={"/dologowania"}>
                        <Image src={"/img/user.svg"} alt="user" width={userIconSize} height={userIconSize} />
                    </Link>

                    <Image src={"img/cart.svg"} alt="cart" width={cartIconSize} height={cartIconSize} />
                </div>
            ) : (
                <div className="flex items-center gap-3">

                    <Link href={"/dologowania"}>
                        <Image src={"/img/blackUser.svg"} alt="user" width={userIconSize} height={userIconSize} />
                    </Link>

                    <Image src={"img/blackCart.svg"} alt="cart" width={cartIconSize} height={cartIconSize} />
                </div>
            )}
        </div>
    )
}
