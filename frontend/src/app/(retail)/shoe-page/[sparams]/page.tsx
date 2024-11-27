"use client"
import ShoePageImageGallery from '@/app/components/SingleShoePage/ShoePageImageGallery'
import Sizes from '@/app/components/SingleShoePage/Sizes'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { getShoe, getUserCart } from '@/lib/userActions'
import { ACCESS_TOKEN } from '@/lib/utils'
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
  const [currentSize, setCurrentSize] = useState<string | null>(null)
  const [sizeErrorVisibility, setSizeErrorVisibility] = useState("hidden")

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

  const handleSizeSelect = (size: string) => {
    if (size !== currentSize) {
      setCurrentSize(size);
    }
  };

  const handleAddToCart = async (id: string, variant: string) => {
    try {
        if (!currentSize) {
          if (sizeErrorVisibility === "hidden") {
            setSizeErrorVisibility("block");
          }
          return;
        }

        const cart = await getUserCart();
        const updatedCart = { ...cart };

        let isCartFull = true;

        for (let i = 1; i < 5; i++) {
            if (updatedCart[`item${i}`] === null) {
                updatedCart[`item${i}`] = id;
                updatedCart[`item${i}_variant`] = parseInt(variant)+1;
                updatedCart[`item${i}_size`] = currentSize;
                isCartFull = false;
                break;
            }
        }

        console.log(updatedCart)

        if (isCartFull) {
            alert("Your Cart is full.");
        } else {
            await api.patch("/api/user-cart/update/", updatedCart, {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            });
            window.location.reload();
        }
    } catch (error) {
        console.error("Błąd przy dodawaniu przedmiotu do koszyka:", error);
    }
};
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
              src={currentImage || '/img/default-shoe-image.png'}
              fill
              alt='main-image'
              key={currentImage}
              className='object-contain'
              sizes="(max-width: 1200px) 100vw, 33vw"
              priority
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

          <Sizes shoe_sizes={shoe.shoe_sizes} handleSizeSelect={handleSizeSelect}/>
          <span className={`text-red-500 font-light ${sizeErrorVisibility}`}>Please choose your size.</span>

          <div className='mt-3 flex flex-col items-center xl:items-start gap-2'>
            <Button onClick={() => {handleAddToCart(id, currentVariant)}} className='w-full max-w-[400px] xl:max-w-[330px] py-5 xl:py-3 rounded-[18px]'>Dodaj do koszyka</Button>
            <Button className='w-full max-w-[400px] xl:max-w-[330px] bg-white text-black rounded-[18px] border-solid border-[1px] border-gray-400 hover:bg-gray-100'>Ulubione ♥</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
