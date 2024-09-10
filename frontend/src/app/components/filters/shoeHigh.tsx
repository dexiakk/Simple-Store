"use client";
import { useState } from "react";

export default function ShoeHighFilter({ onFilterChange }: { onFilterChange: Function; }) {
  const [selectedShoeHigh, setSelectedShoeHigh] = useState<string[]>([]);
  const [listVisibility, setListVisibility] = useState("hidden")

  const shoe_high = [
    { label: 'Buty typu Low', value: 'low' },
    { label: 'Buty typu Mid', value: 'mid' },
    { label: 'Buty typu High', value: 'high' },
  ];

  const handleShoeHighChange = (color: string, checked: boolean) => {
    let updatedShoeHigh;
    if (checked) {
      updatedShoeHigh = [...selectedShoeHigh, color];
    } else {
      updatedShoeHigh = selectedShoeHigh.filter((c) => c !== color);
    }

    setSelectedShoeHigh(updatedShoeHigh);
    onFilterChange("shoe_high", updatedShoeHigh);
  }

  const handleListVisibility = () =>
    {
      listVisibility === "hidden" ? setListVisibility("block") : setListVisibility("hidden")
    }

  return (
    <div className="py-2 border-y-[1px] border-gray-300">
      <div onClick={handleListVisibility} className="text-[17px] font-bold">Wysokość buta</div> 
      <div className={listVisibility}>
        {shoe_high.map(({ label, value }) => (
          <div key={value} className="flex">
            <input
              type="checkbox"
              id={`shoe_high-${value}`}
              value={value}
              checked={selectedShoeHigh.includes(value)}
              onChange={(e) => handleShoeHighChange(value, e.target.checked)}
            />
            <label htmlFor={`shoe_high-${value}`}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
