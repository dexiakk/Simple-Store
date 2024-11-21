import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getShoe, getUserCart } from "@/lib/userActions"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { ACCESS_TOKEN } from "@/lib/utils"

export default function Cart({ color, size }: { color: String, size: number }) {
    const [item1, setItem1] = useState<CartItem>({ id: null, variant: null })
    const [item2, setItem2] = useState<CartItem>({ id: null, variant: null })
    const [item3, setItem3] = useState<CartItem>({ id: null, variant: null })
    const [item4, setItem4] = useState<CartItem>({ id: null, variant: null })


    useEffect(() => {
        const fetchCart = async () => {
            const cart = await getUserCart()

            setItem1({ id: cart.item1, variant: cart.item1_variant })
            setItem2({ id: cart.item2, variant: cart.item2_variant })
            setItem3({ id: cart.item3, variant: cart.item3_variant })
            setItem4({ id: cart.item4, variant: cart.item4_variant })

        }

        fetchCart()
    }, [])

    useEffect(() => {
        const fetchItems = async () => {
            if (item1.id) {
                const shoe1 = await getShoe(item1.id.toString())
                setItem1((prev) => ({ ...prev, shoe: shoe1.shift() }))
            }
            if (item2.id) {
                const shoe2 = await getShoe(item2.id.toString())
                setItem2((prev) => ({ ...prev, shoe: shoe2.shift() }))
            }
            if (item3.id) {
                const shoe3 = await getShoe(item3.id.toString())
                setItem3((prev) => ({ ...prev, shoe: shoe3.shift() }))
            }
            if (item4.id) {
                const shoe4 = await getShoe(item4.id.toString())
                setItem4((prev) => ({ ...prev, shoe: shoe4.shift() }))
            }
        }

        fetchItems()
    }, [item1.id, item2.id, item3.id, item4.id])

    const handleItemDelete = async (itemId: number) => {
        try {
            const cart = await getUserCart();
            const updatedCart = { ...cart };

            if (itemId === 1) {
                updatedCart.item1 = null;
                updatedCart.item1_variant = null;
            } else if (itemId === 2) {
                updatedCart.item2 = null;
                updatedCart.item2_variant = null;
            } else if (itemId === 3) {
                updatedCart.item3 = null;
                updatedCart.item3_variant = null;
            } else if (itemId === 4) {
                updatedCart.item4 = null;
                updatedCart.item4_variant = null;
            }


            await api.patch("/api/user-cart/update/", updatedCart, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            });

            const updatedCartData = await getUserCart();
            return updatedCartData;

        } catch (error) {
            console.error("Błąd przy usuwaniu przedmiotu z koszyka:", error);
            return null
        }
    }

    return (
        <Popover>
            <PopoverTrigger>
                {color === "black" ? (
                    <Image src={"/img/blackCart.svg"} width={size} height={size} alt="cart" />
                ) : (
                    <Image src={"/img/cart.svg"} width={size} height={size} alt="cart" />

                )}
            </PopoverTrigger>
            <PopoverContent className='rounded-[12px] min-w-[350px]'>
                <div className="flex flex-col">
                    {item1.shoe && item1.variant && item1.shoe.variants[parseInt(item1.variant) - 1]?.main_image && (
                        <div className="flex items-center justify-between">
                            <Link href={`/shoe-page/${item1.id}-${parseInt(item1.variant) - 1}`}>
                                <div className="flex">
                                    <Image
                                        src={item1.shoe.variants[parseInt(item1.variant) - 1]?.main_image || "/default-image.png"}
                                        width={50}
                                        height={50}
                                        alt={item1.shoe.model}
                                    />
                                    <div className="flex flex-col ml-3">
                                        <span className="text-[15px] font-semibold">{item1.shoe.manufacturer}&nbsp;{item1.shoe.model}</span>
                                        <div className="flex">
                                            <div className="mr-2 text-[15px] text-gray-600 first-letter:uppercase">{item1.shoe.gender}</div>
                                            <span className="text-[15px] font-semibold">${item1.shoe.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <button className="p-[6px] hover:bg-gray-200 border-solid border-[2px] border-black rounded-[8px]">
                                <Image
                                    src={"/img/delete.svg"}
                                    width={14}
                                    height={14}
                                    alt="delete"
                                    onClick={() => { handleItemDelete(1) }}
                                />
                            </button>
                        </div>
                    )}

                    {item2.shoe && item2.variant && item2.shoe.variants[parseInt(item2.variant) - 1]?.main_image && (
                        <div className="flex items-center justify-between">
                            <Link href={`/shoe-page/${item2.id}-${parseInt(item2.variant) - 1}`}>
                                <div className="flex">
                                    <Image
                                        src={item2.shoe.variants[parseInt(item2.variant) - 1]?.main_image || "/default-image.png"}
                                        width={50}
                                        height={50}
                                        alt={item2.shoe.model}
                                    />
                                    <div className="flex flex-col ml-3">
                                        <span className="text-[15px] font-semibold">{item2.shoe.manufacturer}&nbsp;{item2.shoe.model}</span>
                                        <div className="flex">
                                            <div className="mr-2 text-[15px] text-gray-600 first-letter:uppercase">{item2.shoe.gender}</div>
                                            <span className="text-[15px] font-semibold">${item2.shoe.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <button className="p-[6px] hover:bg-gray-200 border-solid border-[2px] border-black rounded-[8px]">
                                <Image
                                    src={"/img/delete.svg"}
                                    width={14}
                                    height={14}
                                    alt="delete"
                                    onClick={() => { handleItemDelete(2) }}
                                />
                            </button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
