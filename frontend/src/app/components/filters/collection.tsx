"use client";
import { useEffect, useState } from "react";
import AnimatedArrow from "../animatedArrow/animatedArrow";

export default function CollectionFilter({ onFilterChange, filters }: { onFilterChange: Function, filters: Filters }) {
  const [selectedCollection, setSelectedCollection] = useState<number[]>([]); // Tablica liczb
  const [listVisibility, setListVisibility] = useState("hidden");
  const [isArrowActive, setIsArrowActive] = useState(false);

  const collections = [
    { label: 'Phantom', value: 1 },
    { label: 'Spring', value: 2 },
    { label: 'Winter', value: 3 },
  ];

  const handleCollectionChange = (value: number, checked: boolean) => {
    let updatedCollection;
    if (checked) {
      updatedCollection = [...selectedCollection, value];
    } else {
      updatedCollection = selectedCollection.filter((c) => c !== value);
    }

    setSelectedCollection(updatedCollection);
    onFilterChange("collection", updatedCollection);
  };

  const handleListVisibility = () => {
    setListVisibility(listVisibility === "hidden" ? "block" : "hidden");
    setIsArrowActive(!isArrowActive);
  };

  return (
    <div className="py-2 border-y-[1px] border-gray-300">
      <div onClick={handleListVisibility} className="flex justify-between font-bold mb-1">
        Kolekcje
        <AnimatedArrow isActive={isArrowActive} onClick={handleListVisibility} />
      </div>
      <div className={listVisibility}>
        {collections.map(({ label, value }) => (
          <div key={value} className="flex">
            <input
              type="checkbox"
              id={`collection-${value}`}
              value={value}
              checked={selectedCollection.includes(value)}
              onChange={(e) => handleCollectionChange(value, e.target.checked)}
            />
            <label className="pl-[7px]" htmlFor={`collection-${value}`}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}