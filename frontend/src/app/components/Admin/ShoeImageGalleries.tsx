import api from '@/lib/api';
import { getShoe } from '@/lib/userActions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CreateShoeImageGallery from './CreateShoeImageGallery';

interface ShoeItemProps {
    id: number;
    manufacturer: string;
    model: string;
    gender: string;
}

interface ShoeImageGalleriesProps {
    selectedImageGalleryId: number | null;
    onSelectImageGallery: (id: number) => void;
    type: string;
}

export default function ShoeImageGalleries({
    selectedImageGalleryId,
    onSelectImageGallery,
    type,
}: ShoeImageGalleriesProps) {
    const [imageGalleries, setImageGalleries] = useState<any[]>([]);
    const [shoesDetails, setShoesDetails] = useState<Record<string, ShoeItemProps[]>>({});

    useEffect(() => {
        const fetchImageGalleries = async () => {
            try {
                const resp = await api.get('/api/image-galleries/').then((data) => data.data);
                setImageGalleries(resp);
            } catch (error) {
                console.error('Błąd podczas pobierania galerii obrazów:', error);
            }
        };

        fetchImageGalleries();
    }, []);

    const fetchShoe = async (id: string) => {
        if (!shoesDetails[id]) {
            try {
                const shoeData = await getShoe(id);
                if (Array.isArray(shoeData)) {
                    setShoesDetails((prev) => ({ ...prev, [id]: shoeData }));
                } else if (shoeData) {
                    setShoesDetails((prev) => ({ ...prev, [id]: [shoeData] }));
                }
            } catch (error) {
                console.error(`Błąd podczas pobierania danych buta o ID ${id}:`, error);
            }
        }
    };

    useEffect(() => {
        imageGalleries.forEach((item) => {
            fetchShoe(String(item.shoe));
        });
    }, [imageGalleries]);

    const handleSelect = (id: number) => {
        onSelectImageGallery(id);
    };

    return (
        <div className="w-full grid grid-cols-3 gap-4">
            {type === "create" && (
                <>
                    <div className="flex justify-center mb-4 border rounded-[10px] p-1">
                        <CreateShoeImageGallery />
                    </div>
                </>
            )}

            {imageGalleries.map((item) => {
                const shoe = shoesDetails[String(item.shoe)];
                const isSelected = selectedImageGalleryId === item.id;

                return (
                    <div
                        key={item.id}
                        className={`mb-4 border-2 rounded-[10px] p-1 cursor-pointer ${isSelected ? 'border-black' : 'border-gray-300'
                            }`}
                        onClick={() => handleSelect(item.id)}
                    >
                        {shoe && shoe[0] ? (
                            <div className="mt-2 text-sm">
                                <span className="block font-semibold">Image gallery:&nbsp;
                                    <span className="font-normal">{shoe[0].manufacturer}&nbsp;{shoe[0].model}&nbsp;{shoe[0].gender}</span>
                                </span>
                            </div>
                        ) : (
                            <span className="text-gray-500">Loading shoe details...</span>
                        )}
                        <span className="block font-semibold text-sm">Color:&nbsp;
                            <span className="font-normal">{item.color}</span>
                        </span>
                        <div className="flex gap-2">
                            <Image src={item.image1} width={50} height={50} alt="example" />
                            <Image src={item.image2} width={50} height={50} alt="example" />
                            <Image src={item.image3} width={50} height={50} alt="example" />
                            <Image src={item.image4} width={50} height={50} alt="example" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
