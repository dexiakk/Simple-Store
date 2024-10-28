"use client";
import CategoryFilter from "./filters/category";
import GenderFilter from "./filters/gender";
import ColorsFilter from "./filters/colors";
import ShoeHighFilter from "./filters/shoeHigh";
import CollectionFilter from "./filters/collection";
import PriceFilter from "./filters/price";

export default function FiltersSideBar({onFilterChange, filters}: {onFilterChange: Function, filters:Filters}) {
  return (
    <div className="sidebar text-black">
      <CategoryFilter onFilterChange={onFilterChange} filters={filters}/>
      <GenderFilter onFilterChange={onFilterChange} filters={filters}/>
      <ColorsFilter onFilterChange={onFilterChange} filters={filters}/>
      <ShoeHighFilter onFilterChange={onFilterChange} filters={filters}/>
      <CollectionFilter onFilterChange={onFilterChange} filters={filters}/>
      {/* <PriceFilter onFilterChange={onFilterChange} /> */}
    </div>
  );
}