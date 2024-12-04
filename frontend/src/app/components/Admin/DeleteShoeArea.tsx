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

export default function DeleteShoeArea() {
    const [shoeList, setshoeList] = useState<any>(null)
    const [shoeToDeleteId, setShoeToDeleteId] = useState<any>()

    useEffect(() => {
        const fetchShoeList = async () => {
            const resp = await api.get("/api/shoelist/")
                .then(data => data.data)

            setshoeList(resp)
        }

        fetchShoeList()
    }, [])

    const handleShoeToDeleteSelect = (id: any) => {
        if (id && id != shoeToDeleteId) {
            setShoeToDeleteId(id)
        }
    }

    const deleteShoe = async () => {
        if (!shoeToDeleteId) return

        try {
            await api.delete(`/api/shoes/delete/${shoeToDeleteId}/`)
            setshoeList((prev: any) => prev.filter((shoe: any) => shoe.id !== shoeToDeleteId))
            setShoeToDeleteId(null)
            alert("Shoe deleted successfully!")
        } catch (error) {
            console.error("Failed to delete shoe:", error)
            alert("An error occurred while deleting the shoe.")
        }
    }

    return (
        <div className='w-full'>
            <div className={`${shoeToDeleteId ? "block " : "hidden "} mb-2`}>
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
                            <AlertDialogAction className='bg-[#ff0000]  hover:bg-red-600' onClick={deleteShoe}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className='flex flex-col gap-2 mb-5'>
                {shoeList && shoeList.map((item: any) => (
                    <div
                        key={item.id}
                        onClick={() => { handleShoeToDeleteSelect(item.id) }}
                        className={`border-2 ${shoeToDeleteId === item.id ? " border-black " : ""} border-2 p-1 px-3 rounded-[12px]`}
                    >
                        {item.manufacturer}&nbsp;{item.model}&nbsp;{item.gender}
                    </div>
                ))}
            </div>
        </div>
    )
}
