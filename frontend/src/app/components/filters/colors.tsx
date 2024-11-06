"use client";
import { useEffect, useState } from "react";
import AnimatedArrow from "../animatedArrow/animatedArrow";

export default function ColorsFilter({ onFilterChange, filters }: { onFilterChange: Function, filters:Filters }) {
  const [selectedColors, setSelectedColors] = useState(['']);
  const [listVisibility, setListVisibility] = useState("hidden")
  const [isArrowActive, setIsArrowActive] = useState(false);

  useEffect(() => {
    if(filters.colors.length === 0)
    {
      setSelectedColors([''])
    }
    return () => {
    }
  }, [filters.colors])
  

  const colors = [
    { label: 'Czarny', value: 'black' },
    { label: 'Biały', value: 'white' },
    { label: 'Niebieski', value: 'blue' },
    { label: 'Fioletowy', value: 'purple' },
    { label: 'Czerwony', value: 'red' },
    { label: 'Zielony', value: 'green' },
  ];

  const handleColorChange = (color: string, checked: boolean) => {
    let updatedColors;
    if (checked) {
      updatedColors = [...selectedColors, color];
    } else {
      updatedColors = selectedColors.filter((c) => c !== color);
    }

    setSelectedColors(updatedColors);
    onFilterChange("colors", updatedColors);
  }

  const handleListVisibility = () =>
    {
      listVisibility === "hidden" ? setListVisibility("block") : setListVisibility("hidden")
      setIsArrowActive(!isArrowActive);
    }

  return (
    <div className="py-2 border-y-[1px] border-gray-300">
      <div onClick={handleListVisibility} className="flex justify-between font-bold mb-1">
        Kolory 
        <AnimatedArrow isActive={isArrowActive} onClick={handleListVisibility} />
        </div> 
      <div className={listVisibility}>
        {colors.map(({ label, value }) => (
          <div key={value} className="flex">
            <input
              type="checkbox"
              id={`color-${value}`}
              value={value}
              checked={selectedColors.includes(value)}
              onChange={(e) => handleColorChange(value, e.target.checked)}
            />
            <label className="pl-[7px]" htmlFor={`color-${value}`}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
