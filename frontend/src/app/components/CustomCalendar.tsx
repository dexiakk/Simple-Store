import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function CustomCalendar({ selectedDate, onSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(currentMonth.getFullYear());

    const handleYearChange = (event) => {
        const year = parseInt(event.target.value, 10);
        setCurrentYear(year);
        setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    };

    const handleMonthChange = (direction) => {
        const newMonth = currentMonth.getMonth() + direction;
        setCurrentMonth(new Date(currentYear, newMonth, 1));
    };

    const handleDayClick = (day) => {
        onSelect(new Date(currentYear, currentMonth.getMonth(), day));
    };

    const daysInMonth = new Date(currentYear, currentMonth.getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => handleMonthChange(-1)}>{"<"}</button>
                <div>
                    <select
                        value={currentYear}
                        onChange={handleYearChange}
                        className="border p-1"
                    >
                        {Array.from({ length: 100 }, (_, i) => currentYear - i).map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={() => handleMonthChange(1)}>{">"}</button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {daysArray.map(day => (
                    <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className="p-2 hover:bg-gray-200"
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
}
