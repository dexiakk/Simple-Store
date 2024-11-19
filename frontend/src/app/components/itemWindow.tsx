import Image from "next/image";
import { useState, useEffect } from "react";

export default function ItemWindow({ shoeList }: ItemWindowProps) {
  // Przechowujemy stany, które są wspólne dla wszystkich butów
  const [selectedImageVariants, setSelectedImageVariants] = useState<number[]>(new Array(shoeList.length).fill(0));
  const [currentImages, setCurrentImages] = useState<string[]>(shoeList.map((shoe) => shoe.variants[0].main_image));
  const [galleryVisible, setGalleryVisible] = useState<string[]>(new Array(shoeList.length).fill("hidden"));

  // Upewnijmy się, że obrazek buta zmieni się od razu po filtracji
  useEffect(() => {
    setCurrentImages(shoeList.map((shoe, shoeIndex) => shoe.variants[selectedImageVariants[shoeIndex]].main_image));
  }, [shoeList]);

  // Funkcja zmieniająca obrazek
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

  // Funkcja pokazująca galerię obrazków
  const handleMouseEnter = (shoeIndex: number) => {
    const updatedVisibility = [...galleryVisible];
    updatedVisibility[shoeIndex] = "flex";
    setGalleryVisible(updatedVisibility);
  };

  // Funkcja chowania galerii obrazków
  const handleMouseLeave = (shoeIndex: number) => {
    const updatedVisibility = [...galleryVisible];
    updatedVisibility[shoeIndex] = "hidden";
    setGalleryVisible(updatedVisibility);

    // Zresetowanie obrazu do głównego
    setCurrentImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[shoeIndex] = shoeList[shoeIndex].variants[selectedImageVariants[shoeIndex]].main_image;
      return updatedImages;
    });
  };

  return (
    <div className="w-full grid grid-cols-3">
      {shoeList.map((shoe, shoeIndex) => (
        <div
          key={shoe.id}
          className="flex flex-col gap-1 max-w-[400px]"
          onMouseEnter={() => handleMouseEnter(shoeIndex)}
          onMouseLeave={() => handleMouseLeave(shoeIndex)}
        >
          <div className="relative w-full aspect-square max-w-[400px] max-h-[400px]">
            <Image src={currentImages[shoeIndex]} fill alt="shoeImage" className="object-contain" />
          </div>

          {/* Galeria obrazków, widoczna po najechaniu */}
          <div className={`${galleryVisible[shoeIndex]} justify-between mt-2`}>
            {shoe.variants[selectedImageVariants[shoeIndex]].images_gallery[0] &&
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
            {shoe.colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full border-solid border-2"
                style={{ backgroundColor: color.value }}
                onMouseEnter={() => handleColorChange(shoeIndex, index)}
              />
            ))}
          </div>
          <span className="text-[17px] font-bold">${shoe.price}</span>
        </div>
      ))}
    </div>
  );
}
