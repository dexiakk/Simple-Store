import api from '@/lib/api'
import { useEffect, useState } from 'react'
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

export default function DeleteVariantArea() {
    const [variantsList, setVariantsList] = useState<any>(null)
    const [shoeList, setShoeList] = useState<any>(null)
    const [colorList, setColorList] = useState<any>(null);
    const [variantToDeleteId, setVariantToDeleteId] = useState<any>()

    useEffect(() => {
        const fetchVariantsList = async () => {
            const resp = await api.get("/api/shoe-variants/")
                .then(data => data.data)

            setVariantsList(resp)
        }

        const fetchShoeList = async () => {
            const resp = await api.get("/api/shoelist/")
                .then(data => data.data)

            setShoeList(resp)
        }

        const fetchColorList = async () => {
            try {
                const filtersResponse = await api.get("/api/shoe-filters-with-id/");
                const filters = filtersResponse.data.shift();

                if (filters && filters.color) {
                    const parsedColors = filters.color.map((color: string) => {
                        const parsed = JSON.parse(color.replace(/'/g, '"'));
                        return { id: parsed.id, name: parsed.name };
                    });
                    setColorList(parsedColors);
                }
            } catch (error) {
                console.error("Error fetching color list:", error);
                setColorList([]);
            }
        };


        fetchShoeList()
        fetchVariantsList()
        fetchColorList();
    }, [])

    const getShoeDetails = (shoeId: number) => {
        return shoeList.find((shoe: any) => shoe.id === shoeId) || {};
    };

    const getColorName = (colorId: number) => {
        if (!colorList) return "Unknown";
        const color = colorList.find((c: any) => c.id === colorId);
        return color ? color.name : "Unknown";
    };

    const handleVariantToDeleteSelect = (id: any) => {
        if (id && id != variantToDeleteId) {
            setVariantToDeleteId(id)
        }
    }

    const deleteVariant = async () => {
        if (!variantToDeleteId) return

        try {
            await api.delete(`/api/shoe-variant/delete/${variantToDeleteId}/`)
            setVariantsList((prev: any) => prev.filter((shoe: any) => shoe.id !== variantToDeleteId))
            setVariantToDeleteId(null)
            alert("Variant deleted successfully!")
        } catch (error) {
            console.error("Failed to delete variant:", error)
            alert("An error occurred while deleting the variant.")
        }
    }


    return (
        <div className='w-full'>
            <div className={`${variantToDeleteId ? "block " : "hidden "} mb-2`}>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <div className='py-2 px-4 bg-[#ff0000] text-white rounded-[13px] hover:bg-red-600'>Delete</div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete shoe variant from database.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-[#ff0000]  hover:bg-red-600' onClick={deleteVariant}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className='flex flex-col gap-2 mb-5'>
                {variantsList && shoeList && variantsList.map((variant: any) => {
                    const shoeDetails = getShoeDetails(variant.shoe);
                    const colorName = getColorName(variant.color);
                    return (
                        <div
                            key={variant.id}
                            onClick={() => { handleVariantToDeleteSelect(variant.id) }}
                            className={`${variantToDeleteId === variant.id ? " border-black " : ""} border-2 p-1 rounded-[8px]`}
                        >
                            <div>
                                {shoeDetails.manufacturer}&nbsp;{shoeDetails.model}&nbsp;-&nbsp;{shoeDetails.gender}&nbsp;-&nbsp;{colorName}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}