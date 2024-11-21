"use client"
import ShoePageImageGallery from '@/app/components/SingleShoePage/ShoePageImageGallery'
import { Button } from '@/components/ui/button'
import { getShoe } from '@/lib/userActions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page({ params }: any) {
  const router = useRouter()
  const { sparams } = params
  const parts = sparams.split("-");
  const [id, variant] = parts;

  useEffect(() => {
    if (!id || isNaN(Number(id)) || !variant || isNaN(Number(variant))) {
      router.push('/products/');
      return;
    }
  }, [id, variant, router]);

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

  if (!shoe || !shoe.variants?.[currentVariant]) {
    router.push('/products/');
    return null;
  }

  return (
    <div className='w-full flex justify-center mt-6'>
      <div className='w-[90%] flex flex-wrap justify-center gap-3 items-start'>
        <div className='flex gap-3'>
          <ShoePageImageGallery
            shoe={shoe}
            currentVariant={currentVariant}
            handleCurrentImageChange={handleCurrentImageChange}
          />
          <div className='relative w-full aspect-square min-w-[550px] max-w-[600px] min-h-[550px] max-h-[600px]'>
            <Image
              src={currentImage}
              fill
              alt='main-image'
              key={currentImage}
              className='object-contain'
            />
          </div>
        </div>
        <div className='w-full max-w-[650px] xl:max-w-[350px] grid grid-cols-1'>
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

          <span className='w-full pr-7 my-3 font-light'>{shoe.description}</span>

          <div className='mt-3 flex flex-col items-center xl:items-start gap-2'>
            <Button className='w-full max-w-[400px] xl:max-w-[330px] py-5 xl:py-3 rounded-[18px]'>Dodaj do koszyka</Button>
            <Button className='w-full max-w-[400px] xl:max-w-[330px] bg-white text-black rounded-[18px] border-solid border-[1px] border-gray-400 hover:bg-gray-100'>Ulubione ♥</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
