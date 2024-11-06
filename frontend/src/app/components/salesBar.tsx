'use client'
import Image from "next/image"
import { useState, useEffect } from "react"

export default function SalesBar() {
    const salesTexts = [
        <div className="flex items-center gap-6">
            <div className="text-[15px]">BEZPŁATNA DOSTAWA I ZWROT</div>
            <div className="max-w-[320px] text-[12px] font-medium">Społeczność NIKE: bezpłatna dostawa i 30 dni na bezpłatny zwrot.
                <span className="underline pl-1">Dowiedz się więcej i Dołącz do nas</span></div>
        </div>,
        <div className="flex items-center gap-4">
            <div className="text-[15px]">PRZEGLĄDAJ WSZYSTKIE NOWOŚCI</div>
            <div className="text-[12px] font-medium underline">Przeglądaj</div>
        </div>
    ]

    const [salesBarText, setSalesBarText] = useState(salesTexts[0])
    const [salesBarKey, setSalesBarKey] = useState(0)

    const changingSalesTexts = () => {
        if (salesBarKey === 0) {
            setSalesBarKey(1)
            setSalesBarText(salesTexts[1])
        }
        else {
            setSalesBarKey(0)
            setSalesBarText(salesTexts[0])
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            changingSalesTexts();
        }, 5000);

        return () => clearTimeout(timer);
    }, [salesBarKey]);

    return (
        <div className="w-full flex justify-center items-center bg-[#F7F7F7] gap-10 py-3 text-black">
            <span onClick={changingSalesTexts} className="text-[24px] font-semibold hover:opacity-50 cursor-pointer">&lt;</span>
            <div>
                <span className="font-bold">{salesBarText}</span>
            </div>
            <span onClick={changingSalesTexts} className="text-[24px] font-semibold hover:opacity-50 cursor-pointer">&gt;</span>
        </div>
    )
}