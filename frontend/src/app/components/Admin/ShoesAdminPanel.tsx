import React, { useState } from 'react'
import CreateShoeArea from './CreateShoeArea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateShoeVariant from './CreateShoeVariant'
import EditShoeArea from './EditShoeArea'
import EditImageGalleryArea from './EditImageGalleryArea'
import EditShoeVariantArea from './EditShoeVariantArea'
import DeleteShoeArea from './DeleteShoeArea'
import DeleteVariantArea from './DeleteVariantArea'
import DeleteImageGalleryArea from './DeleteImageGalleryArea'

export default function ShoesAdminPanel() {
  const [createVisibility, setCreateVisibility] = useState("block")
  const [createBorder, setCreateBorder] = useState("")
  const [editVisibility, setEditVisibility] = useState("hidden")
  const [editBorder, setEditBorder] = useState("")
  const [listVisibility, setListVisibility] = useState("hidden")
  const [listBorder, setListBorder] = useState("")


  const handleVisibilityChange = (prop: string) => {
    switch (prop) {
      case "create": {
        setCreateVisibility("block")
        setCreateBorder("border-gray-600")
        setEditVisibility("hidden")
        setEditBorder("")
        setListVisibility("hidden")
        setListBorder("")
        break;
      }
      case "edit": {
        setCreateVisibility("hidden")
        setCreateBorder("")
        setEditVisibility("block")
        setEditBorder("border-gray-600")
        setListVisibility("hidden")
        setListBorder("")
        break;
      }
      case "list": {
        setCreateVisibility("hidden")
        setCreateBorder("")
        setEditVisibility("hidden")
        setEditBorder("")
        setListVisibility("block")
        setListBorder("border-gray-600")
        break;
      }
    }
  }

  return (
    <div className='flex w-full  justify-center'>
      <div className='w-[60%] flex justify-between gap-20'>
        <div className='w-full max-w-[250px] flex flex-col gap-3'>
          <div
            className={`${createBorder} border-2 p-2 rounded-[8px] hover:bg-gray-300`}
            onClick={() => { handleVisibilityChange("create") }}
          >
            Create Shoe / ShoeVariant</div>
          <div
            className={`${editBorder} border-2 p-2 rounded-[8px] hover:bg-gray-300`}
            onClick={() => { handleVisibilityChange("edit") }}
          >
            Edit Shoe / Shoe Variant</div>
          <div
            className={`${listBorder} border-2 p-2 rounded-[8px] hover:bg-gray-300`}
            onClick={() => { handleVisibilityChange("list") }}
          >
            Delete Shoe / Shoe Variant</div>
        </div>
        <div className='w-full'>
          <div className={`${createVisibility} max-w-[1000px]`}>
            <Tabs defaultValue="shoe" className='w-full'>
              <TabsList className='w-full justify-center bg-white'>
                <div className='flex gap-3'>
                  <TabsTrigger value="shoe" className='border-2'>Create Shoe</TabsTrigger>
                  <TabsTrigger value="variant" className='border-2'>Create Variant</TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="shoe" className='w-full'>
                <div className='max-w-[500px]'>
                  <CreateShoeArea />
                </div>
              </TabsContent>
              <TabsContent value="variant">
                <CreateShoeVariant />
              </TabsContent>
            </Tabs>
          </div>
          <div className={`${editVisibility}`}>
            <Tabs defaultValue="shoe" className='w-full'>
              <TabsList className='w-full bg-white'>
                <div className='flex gap-3'>
                  <TabsTrigger value="shoe" className='border-2'>Edit Shoe</TabsTrigger>
                  <TabsTrigger value="variant" className='border-2'>Edit Variant</TabsTrigger>
                  <TabsTrigger value="gallery" className='border-2'>Edit Image Gallery</TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="shoe" className='w-full'>
                <div className='max-w-[500px]'>
                  <EditShoeArea />
                </div>
              </TabsContent>
              <TabsContent value="variant">
                <EditShoeVariantArea />
              </TabsContent>
              <TabsContent value="gallery">
                <EditImageGalleryArea />
              </TabsContent>
            </Tabs>
          </div>
          <div className={`${listVisibility}`}>
            <Tabs defaultValue="shoe" className='w-full'>
              <TabsList className='w-full bg-white'>
                <div className='flex gap-3'>
                  <TabsTrigger value="shoe" className='border-2'>Delete Shoe</TabsTrigger>
                  <TabsTrigger value="variant" className='border-2'>Delete Variant</TabsTrigger>
                  <TabsTrigger value="gallery" className='border-2'>Delete Image Gallery</TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="shoe" className='w-full'>
                <div className='max-w-[500px]'>
                  <DeleteShoeArea />
                </div>
              </TabsContent>
              <TabsContent value="variant">
                <DeleteVariantArea />
              </TabsContent>
              <TabsContent value="gallery">
                <DeleteImageGalleryArea />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
