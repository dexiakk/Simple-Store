import FaqBlock from "@/app/components/Faq/FaqBlock"

export default function page() {
  return (
    <div className="w-full flex flex-col items-center mt-7">
      <div>
        <span className="text-[28px] md:text-[36px]">Simple Store | FAQs</span>
      </div>
      <div className="w-full max-w-[80vw] xl:max-w-[40vw] mt-7">
        <div className="w-full">
          <span className="text-[24px] md:text-[28px] font-thin">Profile</span>
          <hr className="w-full h-[2px] bg-gray-300 mt-2" />
          <FaqBlock question="How do I create a user profile?" content="You can create you personal account" link={"/auth/"} />
          <FaqBlock question="I have forgotten my login data. What can I do now?" content="Please contact with our support, details are" link={"/abouts-us/"} />
          <FaqBlock question="How can I change my personal data?" content="You should go to your personal profile, you can click on user icon or" link={"/profile/"} />
          <FaqBlock question="How can I log out?" content="You should go to your personal profile, you can click on user icon or" link={"/profile/"} />
        </div>
      </div>
      <div className="w-full max-w-[80vw] xl:max-w-[40vw] mt-7">
        <div className="w-full">
          <span className="text-[24px] md:text-[28px] font-thin">Store</span>
          <hr className="w-full h-[2px] bg-gray-300 mt-2" />
          <FaqBlock question="Where can I find your local store?" content="We are still working to made our first local store" link={null} />
        </div>
      </div>
      <div className="w-full max-w-[80vw] xl:max-w-[40vw] mt-7">
        <div className="w-full">
          <span className="text-[24px] md:text-[28px] font-thin">Payment methods</span>
          <hr className="w-full h-[2px] bg-gray-300 mt-2" />
          <FaqBlock question="How can I pay in Simple Store?" content="You can check all available payment methods by taking a products into your cart" link={"/products/"} />
        </div>
      </div>
    </div>
  )
}
