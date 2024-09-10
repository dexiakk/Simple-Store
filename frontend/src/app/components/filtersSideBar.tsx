"use client";
import { useState } from "react";
import CategoryFilter from "./filters/category";
import GenderFilter from "./filters/gender";
import ColorsFilter from "./filters/colors";
import ShoeHighFilter from "./filters/shoeHigh";
import CollectionFilter from "./filters/collection";
import PriceFilter from "./filters/price";

export default function FiltersSideBar({onFilterChange}: {onFilterChange: Function;}) {
  return (
    <div className="sidebar text-black">
      <CategoryFilter onFilterChange={onFilterChange} />
      <GenderFilter onFilterChange={onFilterChange} />
      <ColorsFilter onFilterChange={onFilterChange} />
      <ShoeHighFilter onFilterChange={onFilterChange} />
      <CollectionFilter onFilterChange={onFilterChange} />
      {/* <PriceFilter onFilterChange={onFilterChange} /> */}
    </div>
  );
}