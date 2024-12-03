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

interface Color {
  id: number;
  name: string;
}

export default function EditImageGallery({ imageGalleryId }: { imageGalleryId: number }) {
  const [shoeId, setShoeId] = useState<any>(null)
  const [shoe, setShoe] = useState<any | null>(null)
  const [imageGallery, setImageGallery] = useState<any>(null)
  const [colors, setColors] = useState<Color[]>([]);
  const [newColor, setNewColor] = useState<any>();
  const [newFile1, setNewFile1] = useState<File | null>(null);
  const [newFile2, setNewFile2] = useState<File | null>(null);
  const [newFile3, setNewFile3] = useState<File | null>(null);
  const [newFile4, setNewFile4] = useState<File | null>(null);

  useEffect(() => {
    const fetchImageGallery = async () => {
      const resp = await api.get(`/api/image-gallery-to-edit/${imageGalleryId}/`)
        .then(data => data.data)

      setImageGallery(resp)
    }

    fetchImageGallery()
  }, [imageGalleryId])

  useEffect(() => {
    if (imageGallery) {
      setShoeId(imageGallery?.shoe)
      setNewColor(imageGallery?.color)
    }
  }, [imageGallery])

  useEffect(() => {
    const fetchShoe = async () => {
      const resp = await api.get(`/api/shoe-to-edit/${shoeId}/`)
        .then(data => data.data)

      setShoe(resp)
    }

    fetchShoe()
  }, [shoeId])


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

  const handleFileChange = (fileIndex: number, file: File | null) => {
    if (fileIndex === 1) setNewFile1(file);
    if (fileIndex === 2) setNewFile2(file);
    if (fileIndex === 3) setNewFile3(file);
    if (fileIndex === 4) setNewFile4(file);
  };

  const updateFields = async () => {
    const formData = new FormData();

    if (newColor) {
      formData.append('color', newColor);
    }

    if (newFile1) formData.append('image1', newFile1);
    if (newFile2) formData.append('image2', newFile2);
    if (newFile3) formData.append('image3', newFile3);
    if (newFile4) formData.append('image4', newFile4);

    try {
      const response = await api.patch(`/api/image-gallery/update/${imageGalleryId}/`, formData, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Gallery updated successfully');
      } else {
        alert('Failed to update gallery');
      }
    } catch (error) {
      console.error('Error updating gallery:', error);
      alert('An error occurred while updating the gallery');
    }
  };

  return (
    <Sheet key="bottom">
      <SheetTrigger asChild>
        <div className="w-full max-w-[130px] bg-black text-white px-6 py-2 hover:bg-primary/90 rounded-[12px]">Edit Gallery</div>
      </SheetTrigger>
      <SheetContent side="bottom" aria-labelledby="edit-gallery" className="overflow-y-auto max-h-[90vh] pb-[150px] sm:pb-0 flex flex-col items-center">
        <div className=''>
          <SheetHeader>
            <SheetTitle>Edit Image Gallery</SheetTitle>
            <SheetDescription>
              <p id="edit-gallery">Edit images of shoe</p>
            </SheetDescription>
          </SheetHeader>
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
                  <option key={color.id} value={color.name}>
                    {color.name}
                  </option>
                ))}
              </select>

              <span className="mt-2 font-semibold">Current color: {newColor}</span>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className='flex flex-col'>
                  <div className='flex items-center gap-5'>
                    <span className='font-semibold'>Current Image nr&nbsp;{index}</span>
                    {imageGallery && (
                      <Image
                        src={imageGallery[`image${index}`]}
                        width={60}
                        height={60}
                        alt={`Image ${index}`}
                        className="rounded-md"
                      />
                    )}
                  </div>
                  <label className="block font-medium mb-1">Upload Image {index}:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                    className="custom-input"
                  />
                </div>
              ))}
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
