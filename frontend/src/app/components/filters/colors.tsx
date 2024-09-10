"use client";
import { useState } from "react";

export default function ColorsFilter({ onFilterChange }: { onFilterChange: Function; }) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [listVisibility, setListVisibility] = useState("hidden")

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
    }

  return (
    <div className="py-2 border-y-[1px] border-gray-300">
      <div onClick={handleListVisibility} className="text-[17px] font-bold">Kolory</div> 
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
            <label htmlFor={`color-${value}`}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
