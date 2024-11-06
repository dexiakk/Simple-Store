"use client";

export default function CategoryFilter({ onFilterChange, filters }: { onFilterChange: Function, filters:Filters }) {
  return (
    <div className="flex flex-col items-start mb-5 font-bold">
      <button value="1" onClick={(e) => onFilterChange("category", e.target.value)}>Lifestyle</button>
      <button value="2" onClick={(e) => onFilterChange("category", e.target.value)}>Jordan</button>
      <button value="3" onClick={(e) => onFilterChange("category", e.target.value)}>Bieganie</button>
      <button value="4" onClick={(e) => onFilterChange("category", e.target.value)}>Piłka nożna</button>
      <button value="5" onClick={(e) => onFilterChange("category", e.target.value)}>Ćwiczenia i trening</button>
    </div>
  );
}
