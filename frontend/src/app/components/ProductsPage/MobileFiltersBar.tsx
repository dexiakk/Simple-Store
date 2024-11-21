import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import FiltersSideBar from "./filtersSideBar"

export default function MobileFiltersBar({ availableFilters, filters, onFilterChange }: FiltersSideBarProps) {
    return (
        <Popover>
            <PopoverTrigger>
                <span>Filtry</span>
            </PopoverTrigger>
            <PopoverContent className='rounded-[12px] min-w-[350px]'>
                <FiltersSideBar
                    availableFilters={availableFilters}
                    filters={filters}
                    onFilterChange={onFilterChange}
                />
                <div className="text-center  my-3">
                    <button>Wyczyść filtry</button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
