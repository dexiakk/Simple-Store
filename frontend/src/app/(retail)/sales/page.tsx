"use client";
import ItemWindow from "@/app/components/ProductsPage/itemWindow";
import { getShoeOnSaleList } from "@/lib/userActions";
import { useEffect, useState } from "react";

export default function page() {
  const [shoeList, setShoeList] = useState<ShoeItemProps[] | null>(null);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const shoes = await getShoeOnSaleList();
        setShoeList(shoes);
      } catch (error) {
        console.error("Error fetching shoe list:", error);
        setShoeList([]);
      }
    };

    fetchShoes();
  }, []);

  console.log(shoeList)

  return (
    <div>
      <div className="w-full flex flex-col items-center">
        <span className="text-3xl font-semibold mt-4 mb-8">Limited-Time Offers Just for You!</span>
        <div className="w-full flex justify-center px-[200px]">
          {shoeList && shoeList.length > 0 ? (
            <ItemWindow shoeList={shoeList} />
          ) : shoeList === null ? (
            <p>Loading sales...</p>
          ) : (
            <p>Brak produktów w promocji</p>
          )}
        </div>
      </div>
    </div>
  );
}
