"use client"
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/lib/userActions";
import Image from "next/image";
import LogoutButton from "@/app/components/LogoutButton";
import { UserDetailsLabels } from "@/app/constans";

export default function page() {

  const [user, setUser] = useState<userProps | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser()
      setUser(loggedInUser)
    }

    fetchUser()

  }, [])

  const createdAt = user?.created_at
  const date = createdAt ? new Date(createdAt) : null;
  const formattedDate = date && date.toLocaleDateString('en-CA')

  const userData = user && [
    user.username,
    user.firstName,
    user.lastName,
    user.dateOfBirth,
    user.preferedGender,
    formattedDate,
  ]

  console.log(user)

  return (
    <div className="w-full flex justify-center">
      <div className="relative rounded-[10px] w-[30%] border-2">
        <Image src={"/img/blackLogo.png"} width={130} height={130} alt="logo" className="absolute top-0 right-0" />
        <div className="flex items-center pl-14 my-5">
          <div className="border-solid border-gray-500 border-2 w-[80px] h-[80px] rounded-full overflow-hidden">
            <Image
              src="/img/userImg.png"
              alt="user image"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <span className="text-[24px] pl-4">Witaj {user?.firstName}!</span>
        </div>
        <div className="w-full flex flex-col items-center">
            <div className="grid grid-cols-2">
              <div className="flex flex-col text-start mr-4">
                {UserDetailsLabels.map(l => (
                  <span className="h-[28px] mb-3">{l}</span>
                ))}
              </div>
              <div className="flex flex-col">
                {userData?.map(u => (
                  <span className="rounded-[10px] border-2 mb-3 px-3">{u}</span>
                ))}
              </div>
            </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}



// {user && userData!.length > 0 &&
//   UserDetailsLabels.map((label, index) => (
//     <div key={index} className="flex">
//       <span className="font-bold mr-2">{label}</span>
//       <span>{userData![index]}</span>
//     </div>
//   ))}