import React, { useState } from 'react';

export default function ColorFilter({ onFilterChange }) {
    const [selectedColors, setSelectedColors] = useState([]);

    const colors = ['Black', 'White', 'Red', 'Blue', 'Green'];

    const handleCheckboxChange = (color) => {
        const updatedColors = selectedColors.includes(color)
            ? selectedColors.filter((item) => item !== color)
            : [...selectedColors, color];

        setSelectedColors(updatedColors);
        onFilterChange({ color: updatedColors });
    };

    return (
        <div>
            <h3>Color</h3>
            {colors.map((color) => (
                <div key={color}>
                    <input
                        type="checkbox"
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onChange={() => handleCheckboxChange(color)}
                    />
                    <label htmlFor={`color-${color}`}>{color}</label>
                </div>
            ))}
        </div>
    );
}