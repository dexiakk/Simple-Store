"use client";
import { useEffect, useState } from "react";
import AnimatedArrow from "../animatedArrow/animatedArrow";

export default function ShoeHighFilter({ onFilterChange, filters }: { onFilterChange: Function, filters:Filters }) {
  const [selectedShoeHigh, setSelectedShoeHigh] = useState<string[]>([]);
  const [listVisibility, setListVisibility] = useState("hidden")
  const [isArrowActive, setIsArrowActive] = useState(false);

  const shoe_high = [
    { label: 'Buty typu Low', value: 'low' },
    { label: 'Buty typu Mid', value: 'mid' },
    { label: 'Buty typu High', value: 'high' },
  ];

  useEffect(() => {
    if(filters.shoe_high.length === 0)
    {
      setSelectedShoeHigh([''])
    }
    return () => {
    }
  }, [filters.shoe_high])

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
      setIsArrowActive(!isArrowActive);
    }

  return (
    <div className="py-2 border-y-[1px] border-gray-300">
      <div onClick={handleListVisibility} className="flex justify-between font-bold mb-1">
        Wysokość buta 
        <AnimatedArrow isActive={isArrowActive} onClick={handleListVisibility} />
        </div> 
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
            <label className="pl-[7px]" htmlFor={`shoe_high-${value}`}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
