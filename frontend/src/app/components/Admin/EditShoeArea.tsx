import api from '@/lib/api'
import { getShoeList } from '@/lib/userActions'
import React, { useEffect, useState } from 'react'
import EditShoeDetails from './EditShoeDetails'

export default function EditShoeArea() {
    const [shoeList, setshoeList] = useState<any>(null)
    const [shoeToEditId, setShoeToEditId] = useState<any>()

    useEffect(() => {
        const fetchShoeList = async () => {
            const resp = await api.get("/api/shoelist/")
                .then(data => data.data)

            setshoeList(resp)
        }

        fetchShoeList()
    }, [])

    const handleShoeToEditSelect = (id: any) => {
        if (id && id != shoeToEditId) {
            setShoeToEditId(id)
        }
    }

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-2 mb-5'>
                {shoeList && shoeList.map((item: any) => (
                    <div
                        key={item.id}
                        onClick={() => { handleShoeToEditSelect(item.id) }}
                        className={`border-2 ${shoeToEditId === item.id ? " border-black " : ""} border-2 p-1 px-3 rounded-[12px]`}
                    >
                        {item.manufacturer}&nbsp;{item.model}&nbsp;{item.gender}
                    </div>
                ))}
            </div>
                {shoeToEditId &&
                    (<>
                        <EditShoeDetails shoeId={shoeToEditId} />
                    </>)
                }
        </div>
    )
}
