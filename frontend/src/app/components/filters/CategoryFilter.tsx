import React, { useState } from 'react';

export default function CategoryFilter({ onFilterChange }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = ['Sneakers', 'Boots', 'Sandals', 'Running'];

    const handleCheckboxChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
        onFilterChange({ category: updatedCategories });
    };

    return (
        <div>
            <h3>Category</h3>
            {categories.map((category) => (
                <div key={category}>
                    <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCheckboxChange(category)}
                    />
                    <label htmlFor={`category-${category}`}>{category}</label>
                </div>
            ))}
        </div>
    );
}