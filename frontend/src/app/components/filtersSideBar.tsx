'use client'
import { useState } from "react"
import Image from "next/image"
import GenderFilters from "./toFiltersSideBar/genderFilters"
import PricesFilters from "./toFiltersSideBar/pricesFilters"
import ShoeHeightFilters from "./toFiltersSideBar/shoeHeightFilters"
import SizeFilters from "./toFiltersSideBar/sizeFilters"
import ColorFilters from "./toFiltersSideBar/colorFilters"
import SportsFilters from "./toFiltersSideBar/sportsFilters copy"
import CollectionsFilters from "./toFiltersSideBar/collectionsFilters"


export default function FiltersSideBar() {

    const [genderVisibility, setGenderVisibility] = useState("hidden")
    const [pricesVisibility, setPricesVisibility] = useState("hidden")
    const [shoeHeightVisibility, setShoheHeightVisibility] = useState("hidden")
    const [sizeVisibility, setSizeVisibility] = useState("hidden")
    const [colorVisibility, setColorVisibility] = useState("hidden")
    const [sportsVisibility, setSportsVisibility] = useState("hidden")
    const [collectionsVisibility, setCollectionsVisibility] = useState("hidden")

    const changeVisibility = (item: number) => {
        switch (item) {
            case 1: {
                genderVisibility === "hidden" ? setGenderVisibility("block") : setGenderVisibility("hidden")
                break;
            }
            case 2: {
                pricesVisibility === "hidden" ? setPricesVisibility("block") : setPricesVisibility("hidden")
                break;
            }
            case 3: {
                shoeHeightVisibility === "hidden" ? setShoheHeightVisibility("block") : setShoheHeightVisibility("hidden")
                break;
            }
            case 4: {
                sizeVisibility === "hidden" ? setSizeVisibility("block") : setSizeVisibility("hidden")
                break;
            }
            case 5: {
                colorVisibility === "hidden" ? setColorVisibility("block") : setColorVisibility("hidden")
                break;
            }
            case 6: {
                sportsVisibility === "hidden" ? setSportsVisibility("block") : setSportsVisibility("hidden")
                break;
            }
            case 7: {
                collectionsVisibility === "hidden" ? setCollectionsVisibility("block") : setCollectionsVisibility("hidden")
                break;
            }
        }
    }

    return (
        <div className="text-black mr-[40px] pr-14 border-r-[1px] border-stone-200">
            <div className="text-[17px] font-medium">
                <ul className="flex flex-col gap-1">
                    <li>Lifestyle</li>
                    <li>Jordan</li>
                    <li>Bieganie</li>
                    <li>Piłka nożna</li>
                    <li>Ćwiczenia i trening</li>
                </ul>
            </div>
            <div className="pt-8">
                <form>
                    <div onClick={() => { changeVisibility(1) }} className="flex justify-between items-center">
                        <label className="font-semibold">Płeć</label> <br />
                        <Image src={"/img/arrowDown.svg"} width={20} height={20} alt="arrowDown" />
                    </div>
                    <div className={genderVisibility}>
                        <GenderFilters />
                    </div>
                </form>
            </div>
            <div className="pt-8">
                <form>
                    <div onClick={() => { changeVisibility(2) }} className="flex w-[200px] justify-between items-center">
                        <label className="font-semibold">Przeglądaj wg cen</label> <br />
                        <Image src={"/img/arrowDown.svg"} width={20} height={20} alt="arrowDown" />
                    </div>
                    <div className={pricesVisibility}>
                        <PricesFilters />
                    </div>
                </form>
            </div>
            <div className="pt-8">
                <form>
                    <div onClick={() => { changeVisibility(3) }} className="flex w-[200px] justify-between items-center">
                        <label className="font-semibold">Wysokość buta</label> <br />
                        <Image src={"/img/arrowDown.svg"} width={20} height={20} alt="arrowDown" />
                    </div>
                    <div className={shoeHeightVisibility}>
                        <ShoeHeightFilters />
                    </div>
                </form>
            </div>
            <div className="pt-8">
                <form>
                    <div onClick={() => { changeVisibility(4) }} className="flex w-[200px] justify-between items-center">
                        <label className="font-semibold">Rozmiar</label>
                        <Image src={"/img/arrowDown.svg"} width={20} height={20} alt="arrowDown" />
                    </div>
                    <div className={sizeVisibility}>
                        <SizeFilters />
                    </div>
                </form>
            </div>
            <div className="pt-8">
                <form>
                    <div onClick={() => { changeVisibility(5) }} className="flex w-[200px] justify-between items-center">
                        <label className="font-semibold">Wybierz kolor</label> <br />
                        <Image src={"/img/arrowDown.svg"} width={20} height={20} alt="arrowDown" />
                    </div>
                    <div className={colorVisibility}>
                        <ColorFilters />
                    </div>
                </form>
            </div>
            <div className="pt-8">
                <form>
                    <div onClick={() => { changeVisibility(6) }} className="flex w-[200px] justify-between items-center">
                        <label className="font-semibold">Sporty</label> <br />
                        <Image src={"/img/arrowDown.svg"} width={20} height={20} alt="arrowDown" />
                    </div>
                    <div className={sportsVisibility}>
                        <SportsFilters />
                    </div>
                </form>
            </div>
            <div className="pt-8">
                <form>
                    <div onClick={() => { changeVisibility(7) }} className="flex w-[200px] justify-between items-center">
                        <label className="font-semibold">Kolekcje</label> <br />
                        <Image src={"/img/arrowDown.svg"} width={20} height={20} alt="arrowDown" />
                    </div>
                    <div className={collectionsVisibility}>
                        <CollectionsFilters />
                    </div>
                </form>
            </div>
        </div>
    )
}