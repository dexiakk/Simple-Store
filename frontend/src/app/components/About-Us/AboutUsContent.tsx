import Image from "next/image"

export default function AboutUsContent() {
    return (
        <div className="hidden md:flex flex-col items-center">
            <div className="w-full grid grid-cols-2 justify-center items-center mt-5">
                <div className="w-full h-full flex justify-end">
                    <div className="relative aspect-square min-w-[350px] max-w-[500px] min-h-[350px] max-h-[500px]">
                        <Image
                            src={"/img/redJordan.png"}
                            fill
                            alt="bluejordan"
                            className="scale-x-[-1] object-contain"
                        />
                    </div>
                </div>
                <div className="w-full max-w-[40vw] lg:max-w-[30vw] flex flex-col mt-12">
                    <Image src={"/img/about-us.png"} width={220} height={220} alt="about-us" />
                    <span className="ml-4 mt-3 text-[18px]">
                        With a passion for footwear and a commitment to excellence, <span className="font-bold">Simple Store </span>
                        steps into the world of fashion as a fresh and dynamic online store.
                        Though we're just starting out and don't yet have physical locations,
                        our vision is clear: to deliver the latest trends, premium quality,
                        and trusted brands to shoe lovers everywhere.
                    </span>
                </div>
            </div>

            <div className="w-screen mt-20">
                <div className="relative w-screen h-[240px]">
                    <span className="absolute inset-0 flex items-center justify-center text-[48px] font-bold text-white z-30 bg-black bg-opacity-50">BEST<span className="text-red-500">&nbsp;BRANDS&nbsp;</span>IN ONE PLACE</span>
                    <Image src={"/img/banner.png"} fill className="object-cover z-0" alt="banner" />
                </div>
            </div>

            <div className="w-full grid grid-cols-2 justify-center items-center mt-5">
                <div className="flex justify-end">
                    <div className="w-full max-w-[40vw] lg:max-w-[30vw] flex flex-col pt-9 xl:pt-1">
                        <span className="text-4xl text-center mt-4 xl:mt-1 font-bold">"Walk Your Way."</span>
                        <span className="text-[18px] mt-8">
                            With a passion for footwear and a commitment to excellence, <br />
                            <span className="text-[20px] font-bold">"Walk Your Way."</span> This isn’t just a motto—it’s a promise.
                            Every journey is unique, just like every pair of shoes. At <span className="font-bold">Simple Store</span>,
                            we believe in creating moments that matter, one step at a time. Whether you're chasing dreams,
                            exploring new paths, or making bold statements, we’re here to provide the perfect fit for every occasion.
                        </span>
                    </div>
                </div>
                <div className="w-full max-w-[30vw]">
                    <div className="relative aspect-square min-w-[350px] max-w-[400px] min-h-[350px] max-h-[400px]">
                        <Image
                            src={"/img/purpleJordan.png"}
                            fill
                            alt="bluejordan"
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            <hr className="w-[70%] h-[4px] bg-gray-400 mt-10 rounded-[4px]" />

        </div>
    )
}
