import AboutUsContent from "@/app/components/About-Us/AboutUsContent";
import HelpForm from "@/app/components/About-Us/HelpForm";
import Image from "next/image";


export default function page() {
  return (
    <div className="flex flex-col items-center">

      <div className="relative w-screen h-screen">
        <video
          src="/img/jordanVideo.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
        ></video>

        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold textShadow">Welcome to&nbsp;<span className="text-red-500 text-5xl block md:inline md:text-6xl">Simple Store</span></h1>
        </div>
      </div>

    <AboutUsContent />

    <HelpForm />
    </div>
  )
}
