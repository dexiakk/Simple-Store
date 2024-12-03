import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getLoggedInUser, getShoe, getUserCart } from "@/lib/userActions"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { ACCESS_TOKEN } from "@/lib/utils"
import SignleShoeItem from "./SignleShoeItem"
import { Button } from "@/components/ui/button"

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
                { id: cart.item1, variant: cart.item1_variant, size: cart.item1_size },
                { id: cart.item2, variant: cart.item2_variant, size: cart.item2_size },
                { id: cart.item3, variant: cart.item3_variant, size: cart.item3_size },
                { id: cart.item4, variant: cart.item4_variant, size: cart.item4_size },
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
            updatedCart[`item${index + 1}_size`] = null;

            await api.patch("/api/user-cart/update/", updatedCart, {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            });

            setCartItems((prevItems) =>
                prevItems.map((item, i) => (i === index ? { id: null, variant: null, size: null } : item))
            );
        } catch (error) {
            console.error("Błąd przy usuwaniu przedmiotu z koszyka:", error);
        }
    };

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            if (item.shoe) {
                if (item.shoe.sale_price) {
                    const price = parseFloat(item.shoe.sale_price.toString());
                    return acc + price;
                }
                else if (item.shoe.price) {
                    const price = parseFloat(item.shoe.price.toString());
                    return acc + price;
                }
            }
            return acc;
        }, 0);
        setTotalPrice(total);
    }, [cartItems]);

    if (!loggedInUser) {
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
                    {cartItems.map((item, index) => {
                        const variantIndex = parseInt(item.variant!) - 1;
                        const variantExists = Array.isArray(item.shoe?.variants) && item.shoe.variants[variantIndex];
                        return variantExists ? (
                            <div key={index} className="flex items-center justify-between">
                                <SignleShoeItem item={item} />
                                <button
                                    className="p-[6px] hover:bg-gray-200 border-solid border-[2px] border-black rounded-[8px]"
                                    onClick={() => handleItemDelete(index)}
                                >
                                    <Image src="/img/delete.svg" width={14} height={14} alt="delete" />
                                </button>
                            </div>
                        ) : null;
                    })}
                    <div className="py-2 flex justify-end">
                        <span className="font-semibold">Total Price:</span>
                        <div className="ml-2 font-bold">${totalPrice.toFixed(2)}</div>
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <Link href={"/checkout/"}>
                        <Button>Checkout Now</Button>
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
}