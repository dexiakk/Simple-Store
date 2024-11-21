"use client";

import { useState } from "react";
import AnimatedArrow from "./animatedArrow/animatedArrow";

export default function FiltersSideBar({ availableFilters, filters, onFilterChange }: FiltersSideBarProps) {

  const handleCheckboxChange = (key: keyof Filters, value: string, checked: boolean) => {
    onFilterChange(key, value, checked);
  };

  return (
    <div>
      {Object.keys(availableFilters).map((key) => {
        const filterValues = availableFilters[key as keyof Filters];

        const [visibility, setVisibility] = useState("hidden");
        const [isArrowActive, setIsArrowActive] = useState(false);

        const handleFiltersVisibility = () => {
          setVisibility((prev) => (prev === "hidden" ? "block" : "hidden"));
          setIsArrowActive(!isArrowActive);
        };

        // Warunek dla renderowania
        if (key === "category") {
          return (
            <div key={key} className="flex flex-col items-start mb-5 font-semibold gap-1">
              {filterValues.map((value) => {
                const isActive = filters[key as keyof Filters].includes(value);

                return (
                  <div>
                    <span
                      key={value}
                      className={`cursor-pointer ${isActive ? "border-solid border-black border-b-2 pb-[1px]" : ""}`}
                      onClick={() => onFilterChange(key as keyof Filters, value, !isActive)}
                    >
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        } else {
          return (
            <div key={key} className="py-2 border-y-[1px] border-gray-300">
              <div onClick={handleFiltersVisibility} className="flex justify-between font-bold mb-1">
                <span className="first-letter:uppercase cursor-pointer">{key === "shoe_high" ? "Shoe High" : key}</span>
                <AnimatedArrow isActive={isArrowActive} onClick={handleFiltersVisibility} />
              </div>
              <div className={visibility}>
                {filterValues.map((value) => (
                  <div key={value} className="flex gap-2">
                    <input
                      type="checkbox"
                      value={value}
                      checked={filters[key as keyof Filters].includes(value)}
                      onChange={(e) => handleCheckboxChange(key as keyof Filters, value, e.target.checked)}
                    />
                    <label>{value}</label>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
