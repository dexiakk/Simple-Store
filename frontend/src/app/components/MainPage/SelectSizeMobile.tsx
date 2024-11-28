import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function SelectSizeMobile() {
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
        <div className="sm:pt-10 flex flex-col items-center ">
            <span className="text-[17px] mobile:text-[22px] md:text-[24px]">Select Size</span>
            <div className="grid grid-cols-5 gap-3 mt-3 text-center text-[14px]">
                {shoeSizes && shoeSizes.map((size) =>
                    <Link href={"/products/"}>
                        <div key={size} className="flex justify-center hover:bg-slate-400 border-solid border-[2px] py-2 xl:py-3 px-5 xl:px-7 rounded-[6px] select-none">{size}</div>
                    </Link>
                )}
            </div>
        </div>
    )
}





