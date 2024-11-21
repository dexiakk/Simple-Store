import Image from "next/image";

export default function ShoePageImageGallery({shoe, currentVariant, handleCurrentImageChange}:ShoePageGalleryProps) {
  return (
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
                  <div className="relative group min-w-[100px]" key={key}>
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
  )
}
