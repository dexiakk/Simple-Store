"use client";
import React, { useEffect, useState } from "react";
import SignleShoeItem from "../UserDetails/SignleShoeItem";
import { getShoe } from "@/lib/userActions";
import AddressArea from "../UserDetails/AddressArea";

interface CartItem {
    id: string | null;
    variant: string | null;
    size: string | null;
    shoe?: any;
}

export default function OrdersList({ orders }: any) {
    return (
        <div>
            {orders.map((order: any) => (
                <div key={order.id}>
                    <OrderDetails key={order.id} order={order} />
                </div>
            ))}
        </div>
    );
}

function OrderDetails({ order }: { order: any }) {
    const [orderItems, setOrderItems] = useState<CartItem[]>([]);

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

    return (
        <div className="border-2 p-4 mb-4 shadow-sm rounded-[13px]">
            <span className="font-semibold text-lg mb-2">Order #{order.id}</span>
            <div className="flex gap-6">
                <div>
                    <div className="flex flex-col">
                        <div className="flex flex-col mb-2">
                            <span>{order.firstName}&nbsp;{order.lastName}</span>
                            <span>{order.user}</span>
                        </div>
                        <AddressArea addresses={order.address} selectedAddressId={order.selectedAddressId} onSelectAddress={(id) => console.log(id)} />
                    </div>
                </div>
                <div className="order-items grid gap-4 border-2 p-4 rounded-[13px]">
                    {orderItems.map((item, index) => (
                        <SignleShoeItem key={index} item={item} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col text-center mt-3">
                <span>{order.shipped ? "Shpipped" : "Still in progres.."}</span>
                <span>{order.admin_accepted ? "Accepted by " : "Not accepted yet."}&nbsp;{order.admin_accepted_by}</span>       
            </div>
        </div>
    );
}
