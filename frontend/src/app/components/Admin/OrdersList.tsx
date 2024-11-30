"use client";
import React, { useEffect, useState } from "react";
import SignleShoeItem from "../UserDetails/SignleShoeItem";
import { getShoe } from "@/lib/userActions";
import AddressArea from "../UserDetails/AddressArea";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { ACCESS_TOKEN } from "@/lib/utils";

interface CartItem {
    id: string | null;
    variant: string | null;
    size: string | null;
    shoe?: any;
}

export default function OrdersList({ orders, admin }: any) {
    return (
        <div className="grid grid-cols-3 justify-start gap-5">
            {orders.map((order: any) => (
                <div key={order.id} className="flex items-stretch justify-center">
                    <div className="w-full max-w-[505px]">
                        <OrderDetails key={order.id} order={order} admin={admin} />
                    </div>
                </div>
            ))}
        </div>
    );
}

function OrderDetails({ order, admin }: { order: any, admin: any }) {
    const [orderItems, setOrderItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const createdAt = order.created_at
    const date = createdAt ? new Date(createdAt) : null;
    const formattedDate = date && date.toLocaleDateString('en-CA')

    useEffect(() => {
        const items = [
            { id: order.item1, variant: order.item1_variant, size: order.item1_size },
            { id: order.item2, variant: order.item2_variant, size: order.item2_size },
            { id: order.item3, variant: order.item3_variant, size: order.item3_size },
            { id: order.item4, variant: order.item4_variant, size: order.item4_size },
        ].filter(item => item.id);
        const fetchItems = async () => {
            const updatedItems = await Promise.all(
                items.map(async (item) => {
                    if (item.id) {
                        const shoe = await getShoe(item.id.toString());
                        return { ...item, shoe: shoe.shift() };
                    }
                    return item;
                })
            );
            setOrderItems(updatedItems);
        };

        fetchItems();
    }, [order]);

    useEffect(() => {
        const total = orderItems.reduce((acc, item) => {
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
    }, [orderItems]);

    const handleOrderUpdate = async (orderId: number, value: boolean) => {
        try {
            const response = await api.patch(`/api/orders-update/${orderId}/`, {
                admin_accepted: value,
                admin_accepted_by: value ? admin.user_id : null,
                shipped: value,
            },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                }
            );

            window.location.reload()

        } catch (error) {
            return null
        }
    }


    return (
        <div className="border-2 p-4 mb-4 shadow-sm rounded-[13px] flex flex-col h-full">
            <span className={`font-semibold text-lg mb-2 ${order.shipped ? " text-green-600 " : " text-red-600 "}`}>Order #{order.id}</span>
            <div className="flex gap-6">
                <div>
                    <div className="flex flex-col">
                        <div className="flex flex-col mb-4">
                            <span>{order.firstName}&nbsp;{order.lastName}</span>
                            <span>{order.user}</span>
                            <span className="font-semibold">{formattedDate}</span>
                        </div>
                        <AddressArea addresses={order.address} selectedAddressId={order.selectedAddressId} onSelectAddress={(id) => console.log(id)} />
                    </div>
                </div>
                <div className="order-items grid gap-4 border-2 p-4 rounded-[13px]">
                    {orderItems.map((item, index) => (
                        <SignleShoeItem key={index} item={item} />
                    ))}
                    <div className="mb-2">
                        <span className="font-semibold">Total Price: ${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col text-center mt-auto">

                {order.shipped && order.admin_accepted ? (
                    <div>
                        <span className="text-green-600 font-semibold">Shipped</span>
                        <div>
                            <span>Admin accepted by:</span>
                            <span className="font-bold">&nbsp;{order.admin_accepted_by_username}</span>
                        </div>
                        <Button className="mt-2" onClick={() => { handleOrderUpdate(order.id, false) }}>Cancel</Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="text-red-600 font-semibold">Not shipped</span>
                        <span>Not accepted yet.</span>
                        <Button className="mt-2" onClick={() => { handleOrderUpdate(order.id, true) }}>Realize</Button>
                    </div>
                )}


            </div>
        </div>
    );
}
