"use client";
import { useState } from "react";
import AnimatedArrow from "../animatedArrow/animatedArrow";

export default function GenderFilter({ onFilterChange }: { onFilterChange: Function; }) {
  const [selectedGender, setSelectedGender] = useState([]);
  const [listVisibility, setListVisibility] = useState("hidden")
  const [isArrowActive, setIsArrowActive] = useState(false);

  const gender = [
    { label: 'Męskie', value: 'male' },
    { label: 'Damskie', value: 'female' },
    { label: 'Uniseks', value: 'unisex' },
  ];

  const handleGenderChange = (color: string, checked: boolean) => {
    let updatedGender;
    if (checked) {
      updatedGender = [...selectedGender, color];
    } else {
      updatedGender = selectedGender.filter((c) => c !== color);
    }

    setSelectedGender(updatedGender);
    onFilterChange("gender", updatedGender);

  };

  const handleListVisibility = () =>
    {
      listVisibility === "hidden" ? setListVisibility("block") : setListVisibility("hidden")
      setIsArrowActive(!isArrowActive);
    }

  return (
    <div className="py-2 border-y-[1px] border-gray-300">
      <div onClick={handleListVisibility} className="flex justify-between font-bold mb-1">
        Płeć
        <AnimatedArrow isActive={isArrowActive} onClick={handleListVisibility} />
        </div> 
      <div className={listVisibility}>
        <div>
          {gender.map(({ label, value }) => (
            <div key={value} className="flex">
              <input
                type="checkbox"
                id={`gender-${value}`}
                value={value}
                checked={selectedGender.includes(value)}
                onChange={(e) => handleGenderChange(value, e.target.checked)}
              />
              <label className="pl-[7px]" htmlFor={`gender-${value}`}>{label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
