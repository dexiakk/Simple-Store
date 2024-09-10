"use client";
import { useState } from "react";

export default function CollectionFilter({ onFilterChange }: { onFilterChange: Function; }) {
  const [selectedColletion, setSelectedCollection] = useState<string[]>([]);
  const [listVisibility, setListVisibility] = useState("hidden")

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

  const handleListVisibility = () =>
    {
      listVisibility === "hidden" ? setListVisibility("block") : setListVisibility("hidden")
    }

  return (
    <div className="py-2 border-y-[1px] border-gray-300">
      <div onClick={handleListVisibility} className="text-[17px] font-bold">Kolekcje</div> 
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
            <label htmlFor={`collection-${value}`}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
