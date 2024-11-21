import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { navBarLinks } from "../../constans"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import NavBarIcons from "./NavBarIcons"

export default function MobileNav({ color }: { color: String }) {
  const pathName = usePathname()

  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger><HamburgerMenuIcon height={40} width={40} /></SheetTrigger>
        <SheetContent className="max-w-[400px] w-[60%] border-none bg-black bg-opacity-[50%]">
          <SheetClose asChild>
            <div className="flex justify-center">
              <Link href={"/"}>
                <SheetClose>
                  <Image src={"/img/logo.png"} alt="logo" width={130} height={130} />
                </SheetClose>
              </Link>
            </div>
          </SheetClose>

          <div className="w-full text-white text-[26px]">
            <SheetClose className="w-full">
              {navBarLinks.map((item) => {
                return (
                  <SheetClose asChild key={item.route}>
                    <Link href={item.route}>
                      <div className="flex items-center justify-between">
                        <div className={`text-start ${pathName.endsWith(item.route) && "border-b-[2px]"} border-${color}`}>
                          {item.label}
                        </div>
                        <Image src={"/img/arrowLeft.svg"} alt="arrowLeft" width={20} height={20} />
                      </div>
                    </Link>
                  </SheetClose>
                )
              })}
            </SheetClose>
          </div>
          <div className="mt-8">
            <NavBarIcons
              color="white"
              size="xl"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>

  )
}
