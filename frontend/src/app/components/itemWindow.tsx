import Image from "next/image"

export default function ItemWindow({ Brand, Name, ImageSrc, Category, Price, Bestseller, Gender, Colors }: { Brand:string; Name: string; ImageSrc:string; Category:string; Price:number; Bestseller: boolean; Gender:string;  Colors:string }) {
    return (
        <div className="bg-white max-w-[500px] text-black">
            <div className="bg-[#F6F6F6] flex justify-center">
                <Image src={ImageSrc} width={500} height={500} alt="shoePhoto" />
            </div>
            <div className="flex flex-col py-2">
                <span className={`${Bestseller ? "block" : "hidden"} text-orange-500 text-[19px] font-bold`}>Bestseller</span>
                <span className="text-[19px] font-semibold">{Brand} {Name}</span>
                <span>{Category}</span>
                <span className="text-[19px] font-bold py-1">${Price}</span>
                
            </div>
        </div>
    )
}