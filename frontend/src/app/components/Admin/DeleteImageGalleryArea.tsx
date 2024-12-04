import { useEffect, useState } from 'react'
import ShoeImageGalleries from './ShoeImageGalleries'
import { ACCESS_TOKEN } from '@/lib/utils';
import api from '@/lib/api';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DeleteImageGalleryArea() {
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

    const deleteImageGallery = async () => {
        if (!selectedImageGalleryId) return

        try {
            await api.delete(`/api/image-gallery/delete/${selectedImageGalleryId}/`)
            setImageGalleriesList((prev: any) => prev.filter((shoe: any) => shoe.id !== selectedImageGalleryId))
            setSelectedImageGalleryId(null)
            alert("Shoe deleted successfully!")
        } catch (error) {
            console.error("Failed to delete shoe:", error)
            alert("An error occurred while deleting the shoe.")
        }
    }
    
    return (
        <div>
            <div className={`${selectedImageGalleryId ? "block " : "hidden "} mb-2`}>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <div className='py-2 px-4 bg-[#ff0000] text-white rounded-[13px] hover:bg-red-600'>Delete</div>
                        </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete shoe from database.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-[#ff0000]  hover:bg-red-600' onClick={deleteImageGallery}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div>
                <ShoeImageGalleries
                    selectedImageGalleryId={selectedImageGalleryId}
                    onSelectImageGallery={handleImageGallerySelect}
                    type="edit"
                />
            </div>
        </div>
    )
}
