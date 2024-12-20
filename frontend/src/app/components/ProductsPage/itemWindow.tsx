import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ItemWindow({ shoeList }: ItemWindowProps) {
  const [selectedImageVariants, setSelectedImageVariants] = useState<number[]>(new Array(shoeList.length).fill(0));
  const [currentImages, setCurrentImages] = useState<string[]>(
    shoeList.map((shoe) => {
      const variant = Array.isArray(shoe.variants) && shoe.variants.length > 0 ? shoe.variants[0] : null;
      return variant && variant.main_image ? variant.main_image : '/img/default-shoe-image.png';
    })
  );
  const [galleryVisible, setGalleryVisible] = useState<string[]>(new Array(shoeList.length).fill("hidden"));

  useEffect(() => {
    setCurrentImages(
      shoeList.map((shoe, shoeIndex) => {
        const variant = shoe.variants[selectedImageVariants[shoeIndex]];
        return variant && variant.main_image ? variant.main_image : '/img/default-shoe-image.png';
      })
    );
  }, [shoeList]);

  const handleColorChange = (shoeIndex: number, variantIndex: number) => {
    setSelectedImageVariants((prev) => {
      const updatedVariants = [...prev];
      updatedVariants[shoeIndex] = variantIndex;
      return updatedVariants;
    });

    setCurrentImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[shoeIndex] = shoeList[shoeIndex].variants[variantIndex].main_image;
      return updatedImages;
    });
  };

  const handleMouseEnter = (shoeIndex: number) => {
    const updatedVisibility = [...galleryVisible];
    updatedVisibility[shoeIndex] = "flex";
    setGalleryVisible(updatedVisibility);
  };

  const handleMouseLeave = (shoeIndex: number) => {
    const updatedVisibility = [...galleryVisible];
    updatedVisibility[shoeIndex] = "hidden";
    setGalleryVisible(updatedVisibility);

    setCurrentImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[shoeIndex] = shoeList[shoeIndex].variants[selectedImageVariants[shoeIndex]].main_image;
      return updatedImages;
    });
  };
  console.log(shoeList)

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8">
      {shoeList.map((shoe, shoeIndex) => (
        <Link href={`/shoe-page/${shoe.id}-${selectedImageVariants[shoeIndex]}`} key={shoe.id}>
          <div
            key={shoe.id}
            className={`${shoe.on_sale ? "border-2 border-orange-500 p-4 rounded-[9px]" : ""} flex flex-col gap-1 max-w-[600px]`}
            onMouseEnter={() => handleMouseEnter(shoeIndex)}
            onMouseLeave={() => handleMouseLeave(shoeIndex)}
          >
            <div className="relative w-full aspect-square max-w-[600px] max-h-[600px]">
              <Image
                src={currentImages[shoeIndex] || '/img/default-shoe-image.png'}
                fill
                alt="shoeImage"
                className="object-contain"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className={`${galleryVisible[shoeIndex]} justify-between mt-2`}>
              {shoe.variants &&
                Array.isArray(shoe.variants) &&
                shoe.variants.length > 0 &&
                selectedImageVariants[shoeIndex] !== undefined &&
                shoe.variants[selectedImageVariants[shoeIndex]] &&
                shoe.variants[selectedImageVariants[shoeIndex]].images_gallery &&
                shoe.variants[selectedImageVariants[shoeIndex]].images_gallery[0] &&
                Object.keys(shoe.variants[selectedImageVariants[shoeIndex]].images_gallery[0])
                  .filter((key) => key.startsWith("image"))
                  .map((key) => {
                    const imageUrl = shoe.variants[selectedImageVariants[shoeIndex]].images_gallery[0][key];
                    return (
                      <div className="relative w-full aspect-square max-w-[100px] max-h-[100px]" key={key}>
                        <Image
                          src={imageUrl}
                          width={100}
                          height={100}
                          alt={key}
                          onMouseEnter={() => setCurrentImages((prev) => {
                            const updatedImages = [...prev];
                            updatedImages[shoeIndex] = imageUrl;
                            return updatedImages;
                          })}
                        />
                      </div>
                    );
                  })}
            </div>

            {shoe.bestseller && (
              <span className="text-[#AA4F21] font-bold">Best Seller</span>
            )}
            <div className="font-bold">
              {shoe.manufacturer} {shoe.model}
            </div>
            <div className="first-letter:uppercase text-gray-600">{shoe.gender}</div>
            <div className="flex gap-1">
              {Array.isArray(shoe.colors) &&
                shoe.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-solid border-2"
                    style={{ backgroundColor: color.value }}
                    onMouseEnter={() => handleColorChange(shoeIndex, index)}
                  />
                ))}
            </div>
            {shoe.on_sale && (
              <span className="font-bold text-[19px] text-orange-500 mt-1">${shoe.sale_price}</span>
            )}
            <span className={`${shoe.on_sale ? "line-through font-semibold" : ""} text-[17px] font-bold`}>${shoe.price}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}