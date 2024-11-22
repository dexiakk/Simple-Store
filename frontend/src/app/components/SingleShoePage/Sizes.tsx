import { useState } from 'react'

export default function Sizes({ shoe_sizes, handleSizeSelect }: SizesProps) {
    const [isSelected, setIsSelected] = useState<string>("")

    const handleSizeObjSelect = (sizeObj:string) => {
        setIsSelected(sizeObj)
        handleSizeSelect(sizeObj);
    };
    return (
        <div className='flex gap-2 mb-2'>
            {shoe_sizes.map((sizeObj) => (
                <div
                    key={sizeObj.size}
                    className={`px-3 py-2 bg-[#F7F7F7] text-gray-600 cursor-pointer rounded-[7px] hover:bg-gray-300
                    ${isSelected === sizeObj.size ? "bg-gray-300 border-2 border-gray-700" : ""}`}
                    onClick={() => {handleSizeObjSelect(sizeObj.size)}}
                    >
                    {sizeObj.size}
                </div>
            ))}
        </div>
    )
}