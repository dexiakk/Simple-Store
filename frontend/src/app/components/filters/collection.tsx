"use client";
import { useState } from "react";
import AnimatedArrow from "../animatedArrow/animatedArrow";

export default function CollectionFilter({ onFilterChange }: { onFilterChange: Function; }) {
  const [selectedColletion, setSelectedCollection] = useState<string[]>([]);
  const [listVisibility, setListVisibility] = useState("hidden")
  const [isArrowActive, setIsArrowActive] = useState(false);

  const colletions = [
    { label: 'Phantom', value: '1' },
    { label: 'Spring', value: '2' },
    { label: 'Winter', value: '3' },
  ];

  const handleCollectionChange = (color: string, checked: boolean) => {
    let updatedCollection;
    if (checked) {
      updatedCollection = [...selectedColletion, color];
    } else {
      updatedCollection = selectedColletion.filter((c) => c !== color);
    }

    setSelectedCollection(updatedCollection);
    onFilterChange("collection", updatedCollection);
  }

  const handleListVisibility = () => {
    listVisibility === "hidden" ? setListVisibility("block") : setListVisibility("hidden")
    setIsArrowActive(!isArrowActive);
  }

  return (
    <div className="py-2 border-y-[1px] border-gray-300">
      <div onClick={handleListVisibility} className="flex justify-between font-bold mb-1">
        Kolekcje
        <AnimatedArrow isActive={isArrowActive} onClick={handleListVisibility} />
      </div>
      <div className={listVisibility}>
        {colletions.map(({ label, value }) => (
          <div key={value} className="flex">
            <input
              type="checkbox"
              id={`collection-${value}`}
              value={value}
              checked={selectedColletion.includes(value)}
              onChange={(e) => handleCollectionChange(value, e.target.checked)}
            />
            <label className="pl-[7px]" htmlFor={`collection-${value}`}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
