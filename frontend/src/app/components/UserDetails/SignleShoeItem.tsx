"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignleShoeItem({ item }: { item: any }) {
    const variantIndex = item.variant ? parseInt(item.variant) - 1 : 0;
    const variant = item.shoe?.variants?.[variantIndex];
    const imageUrl = variant?.main_image || "/default-image.png";
    const shoeModel = item.shoe?.model || 'Unknown Model';
    const shoeManufacturer = item.shoe?.manufacturer || 'Unknown Manufacturer';

    return (
        <Link href={`/shoe-page/${item.id}-${variantIndex}`}>
            <div className="flex">
                <Image
                    src={imageUrl}
                    width={50}
                    height={50}
                    alt={shoeModel}
                />
                <div className="flex flex-col ml-3">
                    <span className="text-[15px] font-semibold">
                        {shoeManufacturer} {shoeModel}
                    </span>
                    <div className="flex">
                        <div className="mr-1 text-[15px] text-gray-600 first-letter:uppercase">
                            {item.shoe?.gender || 'Unknown Gender'}&nbsp;|
                        </div>
                        <div className="mr-2 text-[15px] text-gray-600 first-letter:uppercase">
                            Size:&nbsp;{item.size}
                        </div>
                        <span className={`${item.shoe?.sale_price ? "text-orange-500" : ""} text-[15px] font-semibold`}>${item.shoe?.sale_price ? item.shoe?.sale_price : item.shoe?.price || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
