"use client";
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from './PriceFilter.module.css';

export default function PriceFilter({ onFilterChange, filters }: { onFilterChange: Function, filters:Filters }) {
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleChange = (value: [number, number]) => {
    setPriceRange(value);
    onFilterChange("priceMin", value[0]);
    onFilterChange("priceMax", value[1]);
  };

  return (
    <div>
      <label>Cena:</label>
      <div className="price-slider">
        <Slider
          min={0}
          max={1000} // Przykładowy maksymalny zakres. Dostosuj według potrzeb.
          defaultValue={[0, 500]}
          value={priceRange}
          onChange={handleChange}
          tipFormatter={(value) => `${value} PLN`} // Formatowanie etykiet
        />
        <div className="price-range">
          <span>Minimalna cena: {priceRange[0]} PLN</span>
          <span>Maksymalna cena: {priceRange[1]} PLN</span>
        </div>
      </div>
    </div>
  );
}