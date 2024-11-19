'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import SalesBar from "../components/salesBar"
import FiltesSideBar from "../components/filtesSideBar"
import ItemWindow from "../components/itemWindow"
import TopBar from "../components/TopBar"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

export default function page({ bgcolor }: { bgcolor: string }) {
  const [shoes, setShoes] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    colors: '',
    price_min: 0,
    price_max: 500,
    shoe_high: '',
  })

  const ClearFilters = {
    category: '',
    gender: '',
    colors: '',
    price_min: 0,
    price_max: 500, 
    shoe_high: '',
  }

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        console.log("Aktualne filtry:", filters); 
        const response = await axios.get('http://localhost:8000/api/shoes/', {
          params: filters, 
        });
        console.log("Dane z API:", response.data); // Sprawdź, jakie dane zwraca API
        setShoes(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania butów:', error);
      }
    };
    fetchShoes();
  }, [filters]);

  const fetchShoes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/shoes/', {
        params: filters,
      });
      setShoes(response.data);
    } catch (error) {
      console.error('Error fetching shoes:', error);
    }
  };


  const handleFilterChange = (key:string, value:any) => {
    const convertedValue = key === 'colors' ? value.join(',') 
    : (key === 'gender' ? value.join(',') 
    : (key === 'shoe_high' ? value.join(',')
    : (key === 'collection' ? value : value)))
  
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: convertedValue,
    }));
  };



  return (
    <main className="flex justify-center bg-white">
      <div className="w-full">
        <TopBar />
        <div className="flex justify-center">
          <div className="w-[90%]">
            <NavBar color="black" />
          </div>
        </div>
        <SalesBar />
        <div className="flex justify-center">
          <div className="w-[90%]">
            <div className="flex justify-between text-black pt-3 pb-5">
              <span className="text-[24px] font-medium">Buty</span>
              <div className="flex gap-7">
                <button onClick={()=>{setFilters(ClearFilters)}}>Usuń filtry</button>
                <span>Sortuj wg</span>
              </div>
            </div>
            <div className="flex justify-between">
              <FiltesSideBar onFilterChange={handleFilterChange} filters={filters}/>
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
