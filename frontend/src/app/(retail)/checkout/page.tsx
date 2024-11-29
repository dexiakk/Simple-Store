"use client"
import AddressArea from "@/app/components/UserDetails/AddressArea"
import SignleShoeItem from "@/app/components/UserDetails/SignleShoeItem"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { getLoggedInUser, getShoe, getUserAdresses, getUserCart } from "@/lib/userActions"
import { ACCESS_TOKEN } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
    const router = useRouter()
    const [loggedInUser, setLoggedInUser] = useState<UserProps | null>(null)
    const [addresses, setAddresses] = useState<AddressProps[] | null>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [addresChooseErrorVisibility, setAddresChooseErrorVisibility] = useState("hidden")

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getLoggedInUser()

            setLoggedInUser(user)
        }
        const fetchUserAddresses = async () => {
            const userAddresses = await getUserAdresses()
            setAddresses(userAddresses)
        }

        fetchUser()
        fetchUserAddresses()
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
            if (item.shoe && item.shoe.price) {
                const price = parseFloat(item.shoe.price.toString());
                return acc + price;
            }
            return acc;
        }, 0);
        setTotalPrice(total);
    }, [cartItems]);

    if (!loggedInUser) {
        return (
            <div>
                <span>Please log in to see your cart!</span>
            </div>
        )
    }

    const handleSelectAddress = (id: number) => {
        setSelectedAddressId(prevId => (prevId === id ? null : id));
    };


    const handlePlaceOrder = () => {
        if (!loggedInUser || !cartItems.length) {
            return;
        }
        createOrder(loggedInUser.user_id, selectedAddressId, cartItems);
    };

    const createOrder = async (
        userId: number,
        selectedAddressId: number | null,
        cartItems: { id: number | null; variant: string | null; size: string | null }[]
    ) => {
        if (!selectedAddressId) {
            if(addresChooseErrorVisibility != "block"){
                setAddresChooseErrorVisibility("block")
            }
            return;
        }

        const orderData = {
            user: userId,
            address: selectedAddressId,
            item1: cartItems[0]?.id || null,
            item1_variant: cartItems[0]?.variant || null,
            item1_size: cartItems[0]?.size || null,
            item2: cartItems[1]?.id || null,
            item2_variant: cartItems[1]?.variant || null,
            item2_size: cartItems[1]?.size || null,
            item3: cartItems[2]?.id || null,
            item3_variant: cartItems[2]?.variant || null,
            item3_size: cartItems[2]?.size || null,
            item4: cartItems[3]?.id || null,
            item4_variant: cartItems[3]?.variant || null,
            item4_size: cartItems[3]?.size || null,
        };

        try {
            console.log(orderData)
            const response = await api.post("/api/order-create/", orderData, {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            });

            if (response.status === 201) {
                setCartItems([]);
                await api.patch("/api/user-cart/update/", {
                    item1: null,
                    item1_variant: null,
                    item1_size: null,
                    item2: null,
                    item2_variant: null,
                    item2_size: null,
                    item3: null,
                    item3_variant: null,
                    item3_size: null,
                    item4: null,
                    item4_variant: null,
                    item4_size: null,
                }, {
                    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                });

                alert("Order successfully placed!");
                window.location.reload();
            } else {
                alert("Failed to create order. Please try again.");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("An error occurred while creating the order. Please try again.");
        }
    };


    return (
        <div className="flex flex-col items-center">
            <span className="text-4xl mt-5">Checkout</span>
            <hr className="w-[90%] sm:w-full max-w-[550px] h-[2px] bg-gray-400 mt-6 mb-4rounded-[4px]" />
            <div className="w-full max-w-[400px] lg:max-w-[450px] flex flex-col mt-8">
                {cartItems.map((item, index) =>
                    item.shoe && item.variant && item.shoe.variants[parseInt(item.variant) - 1]?.main_image ? (
                        <div key={index} className="flex items-center justify-between">
                            <SignleShoeItem item={item} />
                            <button
                                className="p-[6px] hover:bg-gray-200 border-solid border-[2px] border-black rounded-[8px]"
                                onClick={() => handleItemDelete(index)}
                            >
                                <Image src="/img/delete.svg" width={14} height={14} alt="delete" />
                            </button>
                        </div>
                    ) : null
                )}
                <div className="py-4 flex justify-end">
                    <span className="font-semibold">Total Price:</span>
                    <div className="ml-2 font-bold">${totalPrice.toFixed(2)}</div>
                </div>
            </div>
            <hr className="w-[90%] sm:w-full max-w-[550px] h-[2px] bg-gray-400 my-4 rounded-[4px]" />
            <span className="text-2xl mb-4">Please choose your address</span>
            <AddressArea
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelectAddress={handleSelectAddress}
            />
            <span className={`${addresChooseErrorVisibility} text-red-500 mt-3`}>Please choose your address.</span>

            <Button
                className="mt-4 px-10 py-2 text-[17px]"
                onClick={handlePlaceOrder}
            >
                Place Order
            </Button>
        </div>
    );
}