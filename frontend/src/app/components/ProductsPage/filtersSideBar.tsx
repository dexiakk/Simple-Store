"use client";

import { useState } from "react";
import AnimatedArrow from "../Layout/animatedArrow/animatedArrow";

export default function FiltersSideBar({ availableFilters, filters, onFilterChange }: FiltersSideBarProps) {
  // Zarządzanie widocznością dla każdego filtra
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  const toggleVisibility = (key: string) => {
    setVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCheckboxChange = (key: keyof Filters, value: string, checked: boolean) => {
    onFilterChange(key, value, checked);
  };

  return (
    <div>
      {Object.entries(availableFilters).map(([key, filterValues]) => {
        if (key === "category") {
          return (
            <div key={key} className="flex flex-col items-start mb-5 font-semibold gap-1">
              {filterValues.map((value) => {
                const isActive = filters[key as keyof Filters]?.includes(value);

                return (
                  <div key={value}>
                    <span
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
              <div
                onClick={() => toggleVisibility(key)}
                className="flex justify-between font-bold mb-1 cursor-pointer"
              >
                <span className="first-letter:uppercase">{key === "shoe_high" ? "Shoe High" : key}</span>
                <AnimatedArrow isActive={visibility[key]} />
              </div>
              <div className={visibility[key] ? "block" : "hidden"}>
                {filterValues.map((value) => (
                  <div key={value} className="flex gap-2">
                    <input
                      type="checkbox"
                      value={value}
                      checked={filters[key as keyof Filters]?.includes(value)}
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
