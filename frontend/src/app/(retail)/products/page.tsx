"use client"
import FiltersSideBar from '@/app/components/filtersSideBar'
import ItemWindow from '@/app/components/itemWindow'
import { getAvailableFilters, getShoeList } from '@/lib/userActions'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [shoeList, setShoeList] = useState(null)
  const [availableFilters, setAvailableFilters] = useState<Filters>({
    category: [],
    collection: [],
    color: [],
    gender: [],
    shoe_high: [],
  });
  const [filters, setFilters] = useState<Filters>({
    category: [],
    collection: [],
    color: [],
    gender: [],
    shoe_high: [],
  })

  useEffect(() => {
    const fetchFiltersList = async () => {
      const availableFilters = await getAvailableFilters()

      setAvailableFilters(availableFilters)
    }

    fetchFiltersList()

  }, [])

  useEffect(() => {
    const fetchShoeList = async () => {
      const shoe = await getShoeList({ filters })

      setShoeList(shoe)
    }

    fetchShoeList()

  }, [filters])


  const handleFiltersChange = (key: keyof Filters, value: string, checked: boolean) => {
    setFilters((prevFilters) => {
      const updatedValues = checked
        ? [...prevFilters[key], value]
        : prevFilters[key].filter((item) => item !== value);

      return {
        ...prevFilters,
        [key]: Array.from(new Set(updatedValues)),
      };
    });
  };

  return (
    <div>
      <div className='flex py-3 justify-between items-center'>
        <span className='text-[26px]'>Buty (3232)</span>
        <div>
          <button>Wyczyść filtry</button>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='min-w-[200px] pr-10'>
          {availableFilters.category.length > 0 && (
            <FiltersSideBar
              availableFilters={availableFilters}
              filters={filters}
              onFilterChange={handleFiltersChange}
            />
          )}
        </div>
        <div className='w-full flex justify-center'>
          {shoeList && (
            <ItemWindow shoeList={shoeList} />
          )}
        </div>
      </div>
    </div>
  )
}