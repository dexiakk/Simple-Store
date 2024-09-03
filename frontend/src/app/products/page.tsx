'use client'
import { useState, useEffect } from "react"
import Nav from "../components/nav"
import SalesBar from "../components/salesBar"
import FiltersSideBar from "../components/filtersSideBar"
import ItemWindow from "../components/itemWindow"
import TopBar from "../components/topBar"
import Footer from "../components/footer"

export default function page({ bgcolor }: { bgcolor: string }) {
  const [shoes, setShoes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/shoe/')
            .then(response => response.json())
            .then(data => setShoes(data));
    }, []);

  return (
    <main className="flex justify-center bg-white">
      <div className="w-full">
        <TopBar />
        <div className="flex justify-center">
          <div className="w-[90%]">
            <Nav navColor="black" />
          </div>
        </div>
        <SalesBar />
        <div className="flex justify-center">
          <div className="w-[90%]">
            <div className="flex justify-between text-black pt-3 pb-5">
              <span className="text-[24px] font-medium">Mężczyźni Buty (847)</span>
              <div className="flex gap-7">
                <span>Ukryj filtry</span>
                <span>Sortuj wg</span>
              </div>
            </div>
            <div className="flex justify-between">
              <FiltersSideBar />
              <div className="grid grid-cols-3 gap-4">
              {shoes.map(shoe => (
                    <ItemWindow
                        Brand = {shoe.manufacturer.name}
                        Name = {shoe.model}
                        ImageSrc = {shoe.image}
                        Category = {shoe.category.name}
                        Price = {shoe.price}
                        Bestseller = {shoe.bestseller}
                        Gender = {shoe.gender}
                        Colors="blackwhite"
                    />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
