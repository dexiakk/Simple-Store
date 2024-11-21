"use client"
import { Button } from '@/components/ui/button'
import { getShoe } from '@/lib/userActions'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Page({ params }: any) {
  const { sparams } = params
  const parts = sparams.split("-");
  const [id, variant] = parts;
  const [shoe, setShoe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentVariant, setCurrentVariant] = useState(variant)
  const [currentImage, setCurrentImage] = useState('')


  useEffect(() => {
    const fetchShoe = async () => {
      if (id) {
        try {
          const shoeData = await getShoe(id)
          setShoe(shoeData?.[0] || null)
        } catch (error) {

        } finally {
          setLoading(false)
        }
      }
    }


    fetchShoe()
  }, [id])

  useEffect(() => {
    if (shoe && shoe.variants?.[currentVariant]) {
      setCurrentImage(shoe.variants[currentVariant].main_image)
    }
  }, [shoe, currentVariant])

  const handleCurrentImageChange = (source: string) => {
    setCurrentImage(source)
  }

  const handleCurrentVariantChange = (variantId: any) => {
    setCurrentVariant(variantId)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!shoe) {
    return <div>Error: Shoe not found</div>
  }

  console.log(shoe)

  return (
    <div className='w-full flex justify-center mt-6'>
      <div className='w-[80%] flex justify-center gap-3'>
        <div className='flex flex-col gap-3'>
          <div className="relative group">
            <Image
              src={shoe.variants[currentVariant].main_image}
              width={100}
              height={100}
              alt='main-image'
              className="rounded-[10px]"
            />
            <div
              onMouseEnter={() => { handleCurrentImageChange(shoe.variants[currentVariant].main_image) }}
              className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[10px]"
            />
          </div>
          {shoe.variants[currentVariant].images_gallery[0] &&
            Object.keys(shoe.variants[currentVariant].images_gallery[0])
              .filter((key) => key.startsWith("image"))
              .map((key) => {
                const imageUrl = shoe.variants[currentVariant].images_gallery[0][key];
                return (
                  <div className="relative group" key={key}>
                    <Image
                      src={imageUrl}
                      width={100}
                      height={100}
                      alt={key}
                      className="rounded-[10px]"
                    />
                    <div
                      onMouseEnter={() => { handleCurrentImageChange(imageUrl) }}
                      className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[10px]"
                    />
                  </div>
                );
              })}
        </div>
        <div className='relative w-full aspect-square max-w-[600px] max-h-[600px]'>
          <Image
            src={currentImage}
            fill
            alt='main-image'
            key={currentImage}
          />
        </div>
        <div className='w-full max-w-[350px] flex flex-col'>
          {shoe.bestseller && (
            <span className="text-[#AA4F21] font-bold">Best Seller</span>
          )}

          <span className='text-[20px]'>{shoe.manufacturer}&nbsp;{shoe.model}</span>
          <span className='first-letter:uppercase text-gray-600'>{shoe.gender}</span>

          <span className='text-[18px] text-gray-600'>${shoe.price}</span>

          <div className="flex flex-wrap gap-3 mt-3">
            {shoe.variants.map((variant: any, index: number) => (
              <div
                key={variant.id}
                onMouseEnter={() => { handleCurrentVariantChange(index) }}
              >
                <Image
                  src={variant.main_image}
                  width={100}
                  height={100}
                  alt={`variant-${variant.color}-image`}
                  className="rounded-[10px]"
                />
              </div>
            ))}
          </div>

          <span className='my-3 font-light max-w-[330px]'>{shoe.description}</span>

          <div className='mt-3 flex flex-col gap-2'>
            <Button className='w-full max-w-[330px] rounded-[18px]'>Dodaj do koszyka</Button>
            <Button className='w-full max-w-[330px] bg-white text-black rounded-[18px] border-solid border-[1px] border-gray-400 hover:bg-gray-100'>Ulubione ♥</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
