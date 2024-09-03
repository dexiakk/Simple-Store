'use client'
import { useState } from "react";
import Image from "next/image";
import Nav from "./components/nav";
import SelectSize from "./components/selectSize";
import SelectSizeMobile from "./components/selectSizeMobile";
import ItemName from "./components/itemName";
import ItemNameMobile from "./components/itemNameMobile";
import ItemHistoryBackground from "./components/itemHistoryBackground";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState('blueBackground');
  const [jordanColor, setJordanColor] = useState('/img/bluejordan.png');
  const [prevJordanColor, setPrevJordanColor] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [pickedColor, setPickedColor] = useState('blue')

  const setColor = ({ prop }: { prop: string }) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevJordanColor(jordanColor);

    switch (prop) {
      case "purple":
        setBackgroundColor('purpleBackground');
        setJordanColor('/img/purplejordan.png');
        setPickedColor('purple')
        break;
      case "red":
        setBackgroundColor('redBackground');
        setJordanColor('/img/redjordan.png');
        setPickedColor('red')
        break;
      case "green":
        setBackgroundColor('greenBackground');
        setJordanColor('/img/greenjordan.png');
        setPickedColor('green')
        break;
      case "blue":
        setBackgroundColor('blueBackground');
        setJordanColor('/img/bluejordan.png');
        setPickedColor('blue')
        break;
    }
  };

  const hamburgerFunction = () => {
    console.log("klikniete")

  }

  return (
    <main className={`w-full pb-[55px] flex justify-center backgroundTransition backgroundShadow overflow-hidden ${backgroundColor}`}>
      <div className="w-[90%]">
        <Nav navColor="white"/>
        <div className="z-0 absolute backgroundGradient right-[1%] bottom-[1px] w-full h-[1000px]"></div>
        <div className="relative">
          <ItemName />
          <div className="flex justify-center relative mb-24 lg:mb-30 2xl:mb-10 3xl:mb-[-75px]">
            {prevJordanColor && (
              <div className={`absolute slide-out-left h-[300px] mobile:h-[350px] md:h-[500px] lg:h-[600px] w-[300px] mobile:w-[350px] md:w-[500px] lg:w-[600px] mt-20 md:mt-0`} onAnimationEnd={() => setPrevJordanColor('')}>
                <Image src={prevJordanColor} height={600} width={600} alt="previous jordan" />
              </div>
            )}
            <div className={`absolute ${isAnimating ? 'slide-in-right' : ''}`} onAnimationEnd={() => setIsAnimating(false)}>
              <Image className="overflow-hidden h-[300px] mobile:h-[350px] md:h-[500px] lg:h-[600px] w-[300px] mobile:w-[350px] md:w-[500px] lg:w-[600px] mt-20 md:mt-0" src={jordanColor} height={600} width={600} alt="jordan" />
            </div>
            <div className="text-[120px] mobile:text-[150px] md:text-[250px] lg:text-[350px] mt-40 md:mt-16 font-extrabold font-Freeman overflow-hidden select-none">
              NIKE
            </div>
          </div>
          <div className="3xl:mb-[-32px]">
            <div className="flex justify-between elementsCustomMedia text-center 2xl:text-start gap-3 items-start">
              <ItemNameMobile />
              <SelectSize />
              <div className="3xl:mt-4">
                <span className="text-[17px] mobile:text-[22px] md:text-[24px] lg:text-[22px] 2xl:text-[26px] 3xl:text-[22px] font-medium md:font-normal textShadow">Select Color</span>
                <div className="flex z-30 gap-2 mt-3">
                  <div onClick={() => setColor({ prop: "blue" })} className={`${pickedColor == 'blue' ? "border-gray-300 hover:bg-[#0000ff]" : "border-none"} bg-[#0000ff] hover:bg-blue-700 h-10 mobile:h-12 sm:h-14 lg:h-16 w-10 mobile:w-12 sm:w-14 lg:w-16 colorsShadow border-solid border-white border-2 rounded-full`}></div>
                  <div onClick={() => setColor({ prop: "purple" })} className={`${pickedColor == 'purple' ? "border-gray-300 hover:bg-[#9e00ff]" : "border-none"} bg-[#9e00ff] hover:bg-purple-700 h-10 mobile:h-12 sm:h-14 lg:h-16 w-10 mobile:w-12 sm:w-14 lg:w-16 colorsShadow border-solid border-white border-2 rounded-full`}></div>
                  <div onClick={() => setColor({ prop: "red" })} className={`${pickedColor == 'red' ? "border-gray-300 hover:bg-[#ff0000]" : "border-none"} bg-[#ff0000] hover:bg-red-700 h-10 mobile:h-12 sm:h-14 lg:h-16 w-10 mobile:w-12 sm:w-14 lg:w-16 colorsShadow border-solid border-white border-2 rounded-full`}></div>
                  <div onClick={() => setColor({ prop: "green" })} className={`${pickedColor == 'green' ? "border-gray-300 hover:bg-[#00ff04]" : "border-none"} bg-[#00ff04] hover:bg-green-700 h-10 mobile:h-12 sm:h-14 lg:h-16 w-10 mobile:w-12 sm:w-14 lg:w-16 colorsShadow border-solid border-2 rounded-full`}></div>
                </div>
              </div>
            </div>
            <SelectSizeMobile />
            <ItemHistoryBackground />
          </div>
        </div>
      </div>
    </main>
  );
}