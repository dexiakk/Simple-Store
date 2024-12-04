"use client"
import { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import api from '@/lib/api';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ACCESS_TOKEN } from '@/lib/utils';
import ShoeImageGalleries from './ShoeImageGalleries';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface Color {
    id: number;
    name: string;
}

export default function EditShoeVariant({ variantId }: { variantId: any }) {
    const [variant, setVariant] = useState<any>(null)
    const [selectedImageGalleryId, setSelectedImageGalleryId] = useState<number | null>(null);
    const [colors, setColors] = useState<Color[]>([]);
    const [newColor, setNewColor] = useState<any>();
    const [newFile, setNewFile] = useState<File | null>(null);

    const handleImageGallerySelect = (id: number) => {
        setSelectedImageGalleryId(id);
    };

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const filtersResponse = await api.get("/api/shoe-filters-with-id/");
                const filters = filtersResponse.data.shift();

                if (filters && filters.color) {
                    const parsedColors = filters.color.map((color: string) => {
                        const parsed = JSON.parse(color.replace(/'/g, '"'));
                        return { id: parsed.id, name: parsed.name };
                    });
                    setColors(parsedColors);
                }

            } catch (error) {
                return null
            }
        };

        fetchColors();
    }, []);

    useEffect(() => {
        const fetchVariant = async () => {
            const resp = await api.get(`/api/shoe-variant-to-edit/${variantId}/`)
                .then(data => data.data)

            setVariant(resp)
        }

        fetchVariant()
    }, [variantId])

    useEffect(() => {
        if (variant) {
            setNewColor(variant?.color)
        }
    }, [variant])

    const handleFileChange = (file: File | null) => {
        setNewFile(file);
    };

    const updateFields = async () => {
        const formData = new FormData();

        if (newColor) {
            formData.append('color', newColor);
        }

        if (newFile) {
            formData.append('main_image', newFile);
        }

        if (selectedImageGalleryId) {
            formData.append('images_gallery', selectedImageGalleryId.toString());
        }

        try {
            console.log(formData)
            const response = await api.patch(`/api/shoe-variant/update/${variantId}/`, formData, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Variant updated successfully');
            } else {
                alert('Failed to update variant');
            }
        } catch (error) {
            console.error('Error updating variant:', error);
            alert('An error occurred while updating the gallery');
        }
    };

    return (
        <Sheet key="bottom">
            <SheetTrigger asChild>
                <div className="w-full max-w-[130px] bg-black text-white px-6 py-2 hover:bg-primary/90 rounded-[12px]">Edit Variant</div>
            </SheetTrigger>
            <SheetContent side="bottom" aria-labelledby="variant" className="overflow-y-auto max-h-[90vh] pb-[150px] sm:pb-0 flex flex-col items-center">
                <div className=''>
                    <SheetHeader>
                        <SheetTitle>Edit Variant #{variantId}</SheetTitle>
                        <div className='hidden'>
                            <SheetDescription>
                                <p id="variant">Edit variant of shoe</p>
                            </SheetDescription>
                        </div>
                    </SheetHeader>
                    <div className='mt-3'>
                        <div>
                            <div className='flex flex-col mb-2 border-2 rounded-[13px] py-2 px-4'>
                                <label className='font-medium'>Color:</label>
                                <label className="mb-1">Select New Color</label>
                                <select
                                    onChange={(e) => setNewColor(e.target.value)}
                                    className="custom-input"
                                    value={newColor || ''}
                                >
                                    <option value={newColor}>Select color</option>
                                    {colors.map((color) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>

                                <span className="mt-2 font-semibold">Current color: {newColor}</span>
                            </div>
                        </div>
                        <div className='border-2 rounded-[13px] p-4'>
                            <div className='flex items-center gap-5'>
                                <span className='font-semibold'>Current Main Image:</span>
                                {variant && (
                                    <Image
                                        src={variant.main_image}
                                        width={60}
                                        height={60}
                                        alt={`Main Image`}
                                        className="rounded-md"
                                    />
                                )}
                            </div>
                            <label className="block font-medium mb-1">Upload Main Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                                className="custom-input"
                            />
                        </div>
                        <div className='flex flex-col mt-3'>
                            <Popover>
                                <PopoverTrigger>
                                    <div className={`${selectedImageGalleryId && " border-black "} border-2 px-8 py-2 rounded-[13px]`}>
                                        Select New Image Gallery
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='w-full bg-gray-100 overflow-y-auto max-h-[60vh]'>
                                    <ShoeImageGalleries
                                        selectedImageGalleryId={selectedImageGalleryId}
                                        onSelectImageGallery={handleImageGallerySelect}
                                        type="edit"
                                    />
                                </PopoverContent>
                            </Popover>
                            {selectedImageGalleryId && (
                                <>
                                    <span className='mt-2 font-semibold'>Selected image galery ID:&nbsp;{selectedImageGalleryId}</span>
                                    <button
                                        onClick={() => { setSelectedImageGalleryId(null) }}
                                        className='mt-2 py-2 px-4 border-2 rounded-[13px] hover:border-2 hover:bg-red-200 hover:border-red-500'
                                    >
                                        Unselect image gallery
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='w-full flex justify-center gap-4 my-7'>
                        <Button className='px-12' onClick={updateFields}>
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
        </Sheet>
    )
}
