import { AvailableJordanSizes } from "../constans";

export default function SelectSizeMobile() {
    return (
        <div className="sm:pt-10 flex flex-col items-center ">
            <span className="text-[17px] mobile:text-[22px] md:text-[24px]">Select Size</span>
            <div className="grid grid-cols-5 gap-3 mt-3 text-center text-[14px]">
                {AvailableJordanSizes.map((item) =>
                    <div className="hover:bg-slate-400 border-solid border-[2px] py-2 sm:py-3 px-3 sm:px-4 rounded-[6px] select-none">{item}</div>
                )}
            </div>
        </div>
    )
}





