"use client"
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function SelectSize() {
    const [shoeSizes, setShoeSizes] = useState<string[]>([])

    useEffect(() => {
        const fetchShoeSizes = async () => {
            const shoeSizes = await api.get("/api/shoe-sizes-list/")
                .then((res) => res.data)

            setShoeSizes(shoeSizes)
        }

        fetchShoeSizes()
    }, [])

    return (
        <div className="hidden text-center 2xl:text-start lg:block max-w-[360px] textShadow">
            <span className="text-[22px] 2xl:text-[26px] 3xl:text-[23px] font-medium">Select Size</span>
            <div className="grid grid-cols-5 gap-3 mt-3">
                {shoeSizes && shoeSizes.map((size) =>
                    <Link href={"/products/"}>
                        <div key={size} className="flex justify-center hover:bg-slate-400 border-solid border-[2px] py-2 xl:py-3 px-5 xl:px-7 rounded-[6px] select-none">{size}</div>
                    </Link>
                )}
            </div>
        </div>
    )
}





