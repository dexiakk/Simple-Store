"use client";

import MobileFiltersBar from "@/app/components/ProductsPage/MobileFiltersBar";
import FiltersSideBar from "@/app/components/ProductsPage/filtersSideBar";
import ItemWindow from "@/app/components/ProductsPage/itemWindow";
import { getAvailableFilters, getLoggedInUser, getShoeList } from "@/lib/userActions";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [loggedInUser, setLoggedInUser] = useState<UserProps | null>(null);
  const [shoeList, setShoeList] = useState<ShoeItemProps[] | null>(null);
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
  });

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await getLoggedInUser();
  //       setLoggedInUser(user);

  //       if (user?.preferedGender) {
  //         setFilters((prevFilters) => ({
  //           ...prevFilters,
  //           gender: [user.preferedGender],
  //         }));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching logged-in user:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await getAvailableFilters();
        setAvailableFilters(filters);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const shoes = await getShoeList({ filters });
        setShoeList(shoes);
      } catch (error) {
        console.error("Error fetching shoe list:", error);
        setShoeList([]);
      }
    };

    fetchShoes();
  }, [filters]);

  console.log(shoeList)

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
      <div className="flex py-3 justify-between items-center">
        <span className="text-[26px]">
          Buty ({shoeList ? shoeList.length : 0})
        </span>
        <div>
          <button
            className="hidden md:block"
            onClick={() =>
              setFilters({
                category: [],
                collection: [],
                color: [],
                gender: [],
                shoe_high: [],
              })
            }
          >
            Wyczyść filtry
          </button>
          <div className="block md:hidden">
            <MobileFiltersBar
              availableFilters={availableFilters}
              filters={filters}
              onFilterChange={handleFiltersChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="hidden md:block min-w-[200px] pr-10">
          {availableFilters.category.length > 0 && (
            <FiltersSideBar
              availableFilters={availableFilters}
              filters={filters}
              onFilterChange={handleFiltersChange}
            />
          )}
        </div>
        <div className="w-full flex justify-center">
          {shoeList ? (
            <ItemWindow shoeList={shoeList} />
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
}