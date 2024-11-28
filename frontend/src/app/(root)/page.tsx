"use client"
import NavBar from '@/app/components/Layout/NavBar'
import Image from 'next/image'
import React, { useState } from 'react'
import { MainPageColors } from '../constans'
import ItemName from '../components/MainPage/ItemName'
import SelectSize from '../components/MainPage/SelectSize'
import ItemHistoryBackground from '../components/MainPage/ItemHistoryBackground'
import ItemNameMobile from '../components/MainPage/ItemNameMobile'
import SelectSizeMobile from '../components/MainPage/SelectSizeMobile'

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState("blueBackground")
  const [jordanColor, setJordanColor] = useState('/img/bluejordan.png');
  const [prevJordanColor, setPrevJordanColor] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [pickedColor, setPickedColor] = useState('blue')
  const responsiveJordanSize: string = "h-[300px] mobile:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-[300px] mobile:w-[350px] sm:w-[400px] md:w-[500px] lg:w-[600px]"

  const setColor = ({ prop }: { prop: string }) => {
    if (isAnimating) return;
    if (pickedColor === prop) return;
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

  return (
    <div className={`relative size-full flex justify-center text-white backgroundTransition backgroundShadow ${backgroundColor} pb-10`}>
      <div className='w-[90%]'>
        <NavBar
          color="white"
        />

        <div className='absolute inset-0 flex justify-center mt-[35vh] sm:mt-[28vh] md:mt-[26vh] lg:mt-44 pointer-events-none overflow-hidden select-none'>
          <span className='text-[120px] mobile:text-[150px] sm:text-[200px] md:text-[250px] lg:text-[350px] font-extrabold font-Freeman'>
            NIKE
          </span>
        </div>
        <div className='absolute inset-0 flex justify-center mt-[27vh] sm:mt-[22vh] md:mt-[18vh] lg:mt-32 pointer-events-none overflow-hidden z-10 backgroundGradient'>
          {prevJordanColor && (
            <div className={`slide-out-left ${!prevJordanColor && 'hidden'} min-w-[300px]`} onAnimationEnd={() => setPrevJordanColor('')}>
              <Image className={`${responsiveJordanSize} object-cover`} src={prevJordanColor} alt='prevJordan' width={600} height={600} />
            </div>
          )}
          <div className={`overflow-hidden ${isAnimating && 'slide-in-right'} min-w-[300px]`} onAnimationEnd={() => setIsAnimating(false)}>
            <Image className={`${responsiveJordanSize} object-cover`} src={jordanColor} alt='Jordan' width={600} height={600} />
          </div>
        </div>

        <div className='w-full mt-[60vh] md:mt-[62vh] lg:mt-[68vh] 2xl:mt-72 flex flex-wrap justify-between 2xl:flex-col gap-3'>
          <ItemName />
          <ItemNameMobile />
          <div className='hidden lg:flex xl:w-full flex justify-between'>
            <SelectSize />
            <div className='hidden 2xl:block'>
              <ItemHistoryBackground />
            </div>
          </div>
          <div className='text-center 2xl:text-start'>
            <span className='text-[17px] mobile:text-[22px] md:text-[24px] lg:text-[22px] 2xl:text-[26px] 3xl:text-[23px] font-medium textShadow'>Select Color</span>
            <div className='flex gap-2 mt-3 2xl:mt-2'>
              {MainPageColors.map((item) =>
                <div key={item.key} onClick={() => { setColor({ prop: item.key }) }} className={` 
                  h-10 mobile:h-12 sm:h-14 lg:h-16 w-10 mobile:w-12 sm:w-14 lg:w-16 colorsShadow rounded-full
                  ${item.hover} ${pickedColor === item.key
                    ? ` border-solid border-white border-[2px] md:border-2 ${item.pickedColor} `
                    : item.color}`}>
                </div>
              )}
            </div>
          </div>
          <div className='block md:hidden'>
            <SelectSizeMobile />
            <ItemHistoryBackground />
          </div>
        </div>
      </div>
    </div>
  )
}
