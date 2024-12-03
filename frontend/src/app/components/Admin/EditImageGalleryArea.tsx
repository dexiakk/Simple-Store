import api from '@/lib/api'
import { ACCESS_TOKEN } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import ShoeImageGalleries from './ShoeImageGalleries'
import EditImageGallery from './EditImageGallery'

export default function EditImageGalleryArea() {
    const [imageGalleriesList, setImageGalleriesList] = useState<any>(null)
    const [selectedImageGalleryId, setSelectedImageGalleryId] = useState<number | null>(null);

    useEffect(() => {
        const fetchShoeList = async () => {
            const resp = await api.get(
                `/api/image-galleries/`,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then(data => data.data)

            setImageGalleriesList(resp)
        }

        fetchShoeList()
    }, [])

    const handleImageGallerySelect = (id: number) => {
        setSelectedImageGalleryId(id);
    };

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-2 mb-5'>
                <div>
                    {selectedImageGalleryId && (
                        <EditImageGallery imageGalleryId={selectedImageGalleryId} />
                    )}

                </div>
                <ShoeImageGalleries
                    selectedImageGalleryId={selectedImageGalleryId}
                    onSelectImageGallery={handleImageGallerySelect}
                    type="edit"
                />
            </div>
        </div>
    )
}

