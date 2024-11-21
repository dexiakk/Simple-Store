import Image from 'next/image'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ACCESS_TOKEN } from '@/lib/utils'
import api from '@/lib/api'

export default function AddressInputField({ address, type }: AddressInputFieldProps) {
    const [newStreet, setNewStreet] = useState(address?.street)
    const [newHouseNumber, setNewHouseNumber] = useState(address?.house_number)
    const [newCity, setNewCity] = useState(address?.city)
    const [newPostalCode, setNewPostalCode] = useState(address?.postal_code)
    const [newCountry, setNewCountry] = useState(address?.country)

        const updateField = async () => {
            if (!address?.id) {
                alert("Address ID is missing");
                return;
            }
            
            try {
                const response = await api.patch(
                    `/api/useraddress/update/${address.id}/`,
                    {
                        street: newStreet,
                        house_number: newHouseNumber,
                        city: newCity,
                        postal_code: newPostalCode,
                        country: newCountry
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                        },
                    }
                );
                console.log("Address updated successfully:", response.data);
            } catch (error) {
                alert(`Something went wrong during the data update: ${error}`);
            }
        };
    
        const createAddress = async () => {
            try {
                const response = await api.post(
                    "/api/useraddresses/",
                    {
                        street: newStreet,
                        house_number: newHouseNumber,
                        city: newCity,
                        postal_code: newPostalCode,
                        country: newCountry
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                        },
                    }
                );
                window.location.reload()
            } catch (error) {
                alert(`Something went wrong during address add: ${error}`);
            }
        }

    return (
        <Popover>
            <PopoverTrigger>
                <Image src={"/img/edit.svg"} width={20} height={20} alt='editButton' />
            </PopoverTrigger>
            <PopoverContent className='rounded-[12px] min-w-[350px]'>
                <div className='p-1'>
                    <div className='text-center'>
                        <span className='font-bold'>Address</span>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='font-medium mb-1'>Street:</label>
                        <input
                            type='text'
                            value={newStreet || ""}
                            onChange={(e) => setNewStreet(e.target.value)}
                            className='pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
                        />

                    </div>
                    <div className='grid grid-cols-2 gap-x-3 gap-y-2'>
                        <div>
                            <label className='font-medium'>House Number:</label>
                            <input
                                type='text'
                                value={newHouseNumber || ""}
                                onChange={(e) => setNewHouseNumber(e.target.value)}
                                className='min-w-[50px] w-[60%] mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
                            />
                        </div>
                        <div className=''>
                            <label className='font-medium'>Postal Code:</label>
                            <input
                                type='text'
                                value={newPostalCode || ""}
                                onChange={(e) => setNewPostalCode(e.target.value)}
                                className='min-w-[50px] w-[90%] mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='font-medium'>City:</label>
                            <input
                                type='text'
                                value={newCity || ""}
                                onChange={(e) => setNewCity(e.target.value)}
                                className='min-w-[50px] w-[90%] mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
                            />
                        </div>
                        <div>
                            <label className='font-medium'>Country:</label>
                            <input
                                type='text'
                                value={newCountry || ""}
                                onChange={(e) => setNewCountry(e.target.value)}
                                className='min-w-[50px] w-[90%] mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
                            />
                        </div>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <Button className='px-12' onClick={() => { type === "existAddress" ? updateField() : createAddress()}}>
                            Apply
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
