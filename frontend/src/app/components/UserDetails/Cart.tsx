import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getLoggedInUser, getShoe, getUserCart } from "@/lib/userActions"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { ACCESS_TOKEN } from "@/lib/utils"

export default function Cart({ color, size }: { color: String, size: number }) {
const [loggedInUser, setLoggedInUser] = useState(null)
useEffect(() => {
  const fetchUser = async () => {
    const user = await getLoggedInUser()

    setLoggedInUser(user)
  }
  fetchUser()
}, [])

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const fetchCart = async () => {
            const cart = await getUserCart();

            if (!cart) {
                setCartItems([]);
                return;
            }

            const items = [
                { id: cart.item1, variant: cart.item1_variant },
                { id: cart.item2, variant: cart.item2_variant },
                { id: cart.item3, variant: cart.item3_variant },
                { id: cart.item4, variant: cart.item4_variant },
            ];
            setCartItems(items);
        };
        fetchCart();
    }, []);


    useEffect(() => {
        const fetchItems = async () => {
            const updatedItems = await Promise.all(
                cartItems.map(async (item) => {
                    if (item.id) {
                        const shoe = await getShoe(item.id.toString());
                        return { ...item, shoe: shoe.shift() };
                    }
                    return item;
                })
            );
            setCartItems(updatedItems);
        };
        fetchItems();
    }, [cartItems.map(item => item.id).join(",")]);

    const handleItemDelete = async (index: number) => {
        try {
            const cart = await getUserCart();
            const updatedCart = { ...cart };
            updatedCart[`item${index + 1}`] = null;
            updatedCart[`item${index + 1}_variant`] = null;

            await api.patch("/api/user-cart/update/", updatedCart, {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            });

            setCartItems((prevItems) =>
                prevItems.map((item, i) => (i === index ? { id: null, variant: null } : item))
            );
        } catch (error) {
            console.error("Błąd przy usuwaniu przedmiotu z koszyka:", error);
        }
    };

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            if (item.shoe && item.shoe.price) {
                const price = parseFloat(item.shoe.price.toString());
                return acc + price;
            }
            return acc;
        }, 0);
        setTotalPrice(total);
    }, [cartItems]);

    if(!loggedInUser){
        return(
            <Popover>
                <PopoverTrigger>
                    {color === "black" ? (
                        <Image src="/img/blackCart.svg" width={size} height={size} alt="cart" />
                    ) : (
                        <Image src="/img/cart.svg" width={size} height={size} alt="cart" />
                    )}
                </PopoverTrigger>
                <PopoverContent className="rounded-[12px] min-w-[350px]">
                    <div>
                        <span>Please log in to see your cart!</span>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }


    return (
        <Popover>
            <PopoverTrigger>
                {color === "black" ? (
                    <Image src="/img/blackCart.svg" width={size} height={size} alt="cart" />
                ) : (
                    <Image src="/img/cart.svg" width={size} height={size} alt="cart" />
                )}
            </PopoverTrigger>
            <PopoverContent className="rounded-[12px] min-w-[350px]">
                <div className="flex flex-col">
                    {cartItems.map((item, index) =>
                        item.shoe && item.variant && item.shoe.variants[parseInt(item.variant) - 1]?.main_image ? (
                            <div key={index} className="flex items-center justify-between">
                                <Link href={`/shoe-page/${item.id}-${parseInt(item.variant) - 1}`}>
                                    <div className="flex">
                                        <Image
                                            src={item.shoe.variants[parseInt(item.variant) - 1]?.main_image || "/default-image.png"}
                                            width={50}
                                            height={50}
                                            alt={item.shoe.model}
                                        />
                                        <div className="flex flex-col ml-3">
                                            <span className="text-[15px] font-semibold">
                                                {item.shoe.manufacturer} {item.shoe.model}
                                            </span>
                                            <div className="flex">
                                                <div className="mr-2 text-[15px] text-gray-600 first-letter:uppercase">
                                                    {item.shoe.gender}
                                                </div>
                                                <span className="text-[15px] font-semibold">${item.shoe.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    className="p-[6px] hover:bg-gray-200 border-solid border-[2px] border-black rounded-[8px]"
                                    onClick={() => handleItemDelete(index)}
                                >
                                    <Image src="/img/delete.svg" width={14} height={14} alt="delete" />
                                </button>
                            </div>
                        ) : null
                    )}
                    <div className="py-2 flex justify-end">
                        <span className="font-semibold">Total Price:</span>
                        <div className="ml-2 font-bold">${totalPrice.toFixed(2)}</div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}