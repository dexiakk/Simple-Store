import api from '@/lib/api'
import { useEffect, useState } from 'react'
import EditShoeVariant from './EditShoeVariant';


export default function EditShoeVariantArea() {
    const [variantsList, setVariantsList] = useState<any>(null)
    const [shoeList, setShoeList] = useState<any>(null)
    const [colorList, setColorList] = useState<any>(null);
    const [variantToEditId, setVariantToEditId] = useState<any>()

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

    const handleVariantToEditSelect = (id: any) => {
        if (id && id != variantToEditId) {
            setVariantToEditId(id)
        }
    }

    return (
        <div>
            <div className='flex flex-col gap-3'>
                <div>
                    {variantToEditId && (
                        <>
                            <EditShoeVariant variantId={variantToEditId}/>
                        </>
                    )}
                </div>
                {variantsList && shoeList && variantsList.map((variant: any) => {
                    const shoeDetails = getShoeDetails(variant.shoe);
                    const colorName = getColorName(variant.color);
                    return (
                        <div
                            key={variant.id}
                            onClick={() => { handleVariantToEditSelect(variant.id) }}
                            className={`${variantToEditId === variant.id ? " border-black " : ""} border-2 p-1 rounded-[8px]`}
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
