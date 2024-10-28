import { AvailableJordanSizes } from "../constans";

export default function SelectSize() {
    return (
        <div className="hidden text-center 2xl:text-start lg:block max-w-[360px] textShadow">
            <span className="text-[22px] 2xl:text-[26px] 3xl:text-[23px] font-medium">Select Size</span>
            <div className="grid grid-cols-5 gap-3 mt-3 text-center">
                {AvailableJordanSizes.map((item) => 
                <div className="hover:bg-slate-400 border-solid border-[2px] py-2 xl:py-3 px-5 xl:px-7 rounded-[6px] select-none">{item}</div>
                )}
            </div>
        </div>
    )
}





