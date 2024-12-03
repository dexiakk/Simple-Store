"use client"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import api from "@/lib/api"
import { ACCESS_TOKEN } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function EditShoeDetails({ shoeId }: { shoeId: string }) {
    const [shoe, setShoe] = useState<any | null>(null)
    const [newManufacturer, setNewManufacturer] = useState<any>()
    const [newModel, setNewModel] = useState<any>()
    const [newPrice, setNewPrice] = useState<any>()
    const [newBestseller, setNewBestseller] = useState<any>()
    const [newOnSale, setNewOnSale] = useState<any>()
    const [newOnSalePrice, setNewOnSalePrice] = useState<any>()
    const [newCategory, setNewCategory] = useState<any>()
    const [newCollection, setNewCollection] = useState<any>()
    const [newGender, setNewGender] = useState<any>()
    const [newShoeHigh, setNewShoeHigh] = useState<any>()
    const [newDescription, setNewDescription] = useState<any>()
    const [newSizes, setNewSizes] = useState<any>()
    const [sizes, setSizes] = useState<any>(null);
    const [filters, setFilters] = useState<any>(null)

    useEffect(() => {
        const fetchFilters = async () => {
            const resp = await api.get("/api/shoe-filters-with-id/")
                .then(data => data.data.shift())

            setFilters(resp)
        }

        fetchFilters()
    }, [])
    useEffect(() => {
        const fetchSizes = async () => {
            const resp = await api.get("/api/shoe-sizes-with-id-list/")
                .then(data => data.data);
            setSizes(resp);
        };

        fetchSizes();
    }, []);

    useEffect(() => {
        const fetchShoe = async () => {
            const resp = await api.get(`/api/shoe-to-edit/${shoeId}/`)
                .then(data => data.data)

            setShoe(resp)
        }

        fetchShoe()
    }, [])

    useEffect(() => {
        if (shoe) {
            setNewManufacturer(shoe?.manufacturer)
            setNewModel(shoe?.model)
            setNewPrice(shoe?.price)
            setNewBestseller(shoe?.bestseller)
            setNewOnSale(shoe?.on_sale)
            setNewOnSalePrice(shoe?.sale_price)
            setNewCategory(shoe?.category)
            setNewCollection(shoe?.collection)
            setNewGender(shoe?.gender)
            setNewShoeHigh(shoe?.shoe_high)
            setNewDescription(shoe?.description)
            setNewSizes(shoe?.shoe_sizes || []);
        }
    }, [shoe])

    const updateField = async () => {
        if (!shoe?.id) {
            alert("Shoe ID is missing");
            return;
        }

        const salePrice = newOnSale === false ? null : newOnSalePrice;

        try {
            const response = await api.patch(
                `/api/shoes/update/${shoe.id}/`,
                {
                    manufacturer: newManufacturer,
                    model: newModel,
                    price: newPrice,
                    sale_price: salePrice,
                    bestseller: newBestseller,
                    on_sale: newOnSale,
                    category: newCategory,
                    collection: newCollection,
                    gender: newGender,
                    shoe_high: newShoeHigh,
                    description: newDescription,
                    shoe_sizes: newSizes,
                },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Shoe updated successfully:", response.data);
        } catch (error) {
            alert(`Something went wrong during the update: ${error}`);
        }
    };

    return (
        <Sheet key="bottom">
            <SheetTrigger asChild>
                <div className="bg-black text-white px-6 py-2 hover:bg-primary/90 rounded-[12px]">Edit Shoe</div>
            </SheetTrigger>
            <SheetContent side="bottom" aria-labelledby="shoe" className="overflow-y-auto max-h-[90vh] pb-[150px] sm:pb-0">
                <div className='p-1 w-full flex flex-col items-center gap-1'>
                    <div className="hidden">
                        <SheetHeader>
                            <SheetTitle>Edit Image Gallery</SheetTitle>
                            <SheetDescription>
                                <p id="shoe">Edit images of shoe</p>
                            </SheetDescription>
                        </SheetHeader>
                    </div>
                    <div className='text-center'>
                        <span className='font-bold'>Shoe #{shoeId}</span>
                    </div>
                    <div className="block sm:flex gap-4">
                        <div className='flex flex-col mb-2 border-2 rounded-[13px] py-2 px-4'>
                            <label className='font-medium'>Manufacturer:</label>
                            <label className="mb-1">Select New Manufacturer</label>
                            <select onChange={(e) => setNewManufacturer(e.target.value)} className="custom-input">
                                <option value={newManufacturer} selected={newManufacturer === null || newManufacturer === undefined}>
                                    Select manufacturer
                                </option>
                                {filters && filters.manufacturer && filters.manufacturer.map((item: string, index: number) => {
                                    const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                    const { id, brand } = parsedItem;
                                    return (
                                        <option key={`manufacturer_${id}_${index}`} value={id}>
                                            {brand}
                                        </option>
                                    );
                                })}
                            </select>

                            <span className="mt-2 font-semibold">New manufacturer ID: {newManufacturer}</span>
                        </div>

                        <div className='flex flex-col border-2 rounded-[13px] py-2 px-4 mb-2'>
                            <label className='font-medium mb-1'>Model:</label>
                            <input
                                type='text'
                                value={newModel || ""}
                                onChange={(e) => setNewModel(e.target.value)}
                                className='pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
                            />

                            <span className="mt-2 font-semibold">New model: {newModel}</span>
                        </div>

                    </div>

                    <div className="block sm:flex gap-4">
                        <div className='flex flex-col border-2 rounded-[13px] py-2 px-4 mb-2'>
                            <label className='font-medium mb-1'>Price:</label>
                            <input
                                type='number'
                                value={newPrice || ""}
                                onChange={(e) => setNewPrice(e.target.value)}
                                className='pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
                            />

                            <span className="mt-2 font-semibold">New price: {newPrice}</span>
                        </div>

                        <div className='flex flex-col border-2 rounded-[13px] py-2 px-4 mb-2'>
                            <label className='font-medium mb-1'>Bestseller:</label>
                            <input
                                type='checkbox'
                                checked={!!newBestseller}
                                onChange={(e) => setNewBestseller(!newBestseller)}
                                className='h-4 w-4 border-gray-300 border-2 rounded-[7px]'
                            />
                            <span className="mt-2 font-semibold">Bestseller: {newBestseller ? "Yes" : "No"}</span>
                        </div>

                        <div className='flex flex-col border-2 rounded-[13px] py-2 px-4 mb-2'>
                            <label className='font-medium mb-1'>On Sale:</label>
                            <input
                                type='checkbox'
                                checked={!!newOnSale}
                                onChange={(e) => setNewOnSale(e.target.checked)}
                                className='h-4 w-4 border-gray-300 border-2 rounded-[7px]'
                            />
                            <span className="mt-2 font-semibold">On Sale: {newOnSale ? "Yes" : "No"}</span>
                        </div>


                        {newOnSale && (
                            <>
                                <div className='flex flex-col border-2 rounded-[13px] py-2 px-4 mb-2'>
                                    <label className='font-medium mb-1'>Sale Price:</label>
                                    <input
                                        type='number'
                                        value={newOnSalePrice || ""}
                                        onChange={(e) => setNewOnSalePrice(e.target.value)}
                                        className='pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
                                    />

                                    <span className="mt-2 font-semibold">New sale price: {newOnSalePrice}</span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="block sm:flex gap-4">
                        <div className='flex flex-col mb-2 border-2 rounded-[13px] rounded py-2 px-4'>
                            <label className='font-medium'>Category:</label>
                            <label className="mb-1">Select New Category</label>
                            <select onChange={(e) => setNewCategory(e.target.value)} className="custom-input">
                                <option value={newCategory} selected={newCategory === null || newCategory === undefined}>
                                    Select category
                                </option>
                                {filters && filters.category && filters.category.map((item: string, index: number) => {
                                    const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                    const { id, name } = parsedItem;
                                    return (
                                        <option key={`category_${id}_${index}`} value={id}>
                                            {name}
                                        </option>
                                    );
                                })}
                            </select>

                            <span className="mt-2 font-semibold">New category ID: {newCategory}</span>
                        </div>

                        <div className='flex flex-col mb-2 border-2 rounded-[13px] rounded py-2 px-4'>
                            <label className='font-medium'>Collection:</label>
                            <label className="mb-1">Select New Collection</label>
                            <select onChange={(e) => setNewCollection(e.target.value)} className="custom-input">
                                <option value={newCollection} selected={newCollection === null || newCollection === undefined}>
                                    Select Collection
                                </option>
                                {filters && filters.collection && filters.collection.map((item: string, index: number) => {
                                    const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                    const { id, name } = parsedItem;
                                    return (
                                        <option key={`collection_${id}_${index}`} value={id}>
                                            {name}
                                        </option>
                                    );
                                })}
                            </select>

                            <span className="mt-2 font-semibold">New collection ID: {newCollection}</span>
                        </div>
                    </div>

                    <div className="block sm:flex gap-4">
                        <div className='flex flex-col mb-2 border-2 rounded-[13px] rounded py-2 px-4'>
                            <label className='font-medium'>Gender:</label>
                            <label className="mb-1">Select New Gender</label>
                            <select
                                onChange={(e) => setNewGender(e.target.value)}
                                className="custom-input"
                            >
                                <option value={newGender} selected={newGender === null || newGender === undefined}>
                                    Select Gender
                                </option>
                                {filters && filters.gender && filters.gender.map((item: string, index: number) => {
                                    const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                    const { id, name } = parsedItem;
                                    return (
                                        <option key={`gender_${id}_${index}`} value={id}>
                                            {id}
                                        </option>
                                    );
                                })}
                            </select>

                            <span className="mt-2 font-semibold">New gender ID: {newGender}</span>
                        </div>

                        <div className='flex flex-col mb-2 border-2 rounded-[13px] rounded py-2 px-4'>
                            <label className='font-medium'>Shoe High:</label>
                            <label className="mb-1">Select New Shoe High</label>
                            <select onChange={(e) => setNewShoeHigh(e.target.value)} className="custom-input">
                                <option value={newShoeHigh} selected={newShoeHigh === null || newShoeHigh === undefined}>
                                    Select shoe high
                                </option>
                                {filters && filters.shoe_high && filters.shoe_high.map((item: string, index: number) => {
                                    const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                    const { id, name } = parsedItem;
                                    return (
                                        <option key={`shoe_high_${id}_${index}`} value={id}>
                                            {name}
                                        </option>
                                    );
                                })}
                            </select>

                            <span className="mt-2 font-semibold">New shoe high ID: {newShoeHigh}</span>
                        </div>
                    </div>
                    <div className='w-full max-w-[300px] sm:max-w-[400px] flex flex-col border-2 rounded-[13px] py-2 px-4 mb-2'>
                        <label className='font-medium mb-1'>Description:</label>
                        <textarea
                            value={newDescription || ""}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className='overflow-y-auto h-auto pl-3 py-1 border-gray-300 border-2 rounded-[7px] resize-none overflow-hidden'
                            style={{ width: "100%", minHeight: "100px", wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                        />
                    </div>
                    <div className="grid grid-cols-3 sm:flex gap-4">
                        {sizes && sizes.map((item: { id: number, size: string }, index: number) => (
                            <div key={`size_${item.id}_${index}`} className="flex flex-col items-center">
                                <label key={`size_label_${item.id}_${index}`} className="flex items-center">
                                    {item.size}
                                </label>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    checked={newSizes?.includes(item.id)}
                                    onChange={(e) => {
                                        const selectedValue = Number(e.target.value);
                                        const newValue = e.target.checked
                                            ? [...newSizes, selectedValue]
                                            : newSizes.filter((id: number) => id !== selectedValue);

                                        setNewSizes(newValue);
                                    }}
                                    className="h-4 w-4"
                                />
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-center mt-5 gap-4'>
                        <Button
                            onClick={() => { updateField() }}
                        >
                            Apply
                        </Button>
                        <SheetClose>
                            <Button className='px-14 text-[16px]'>
                                Exit
                            </Button>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet >
    )
}