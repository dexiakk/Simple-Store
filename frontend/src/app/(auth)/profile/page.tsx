"use client"
import { useEffect, useState } from "react";
import { getLoggedInUser, getUserAdresses } from "@/lib/userActions";
import Image from "next/image";
import LogoutButton from "@/app/components/LogoutButton";
import { UserDetailsLabels } from "@/app/constans";
import UserDetails from "@/app/components/UserDetails";
import { Button } from "@/components/ui/button";
import AddressArea from "@/app/components/AddressArea";
import { ACCESS_TOKEN } from "@/lib/utils";
import api from "@/lib/api";
import EditUserPhoto from "@/app/components/EditUserPhoto";

export default function page() {

  const [user, setUser] = useState<UserProps | null>(null)
  const [addresses, setAddresses] = useState<AddressProps[] | null>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser()
      setUser(loggedInUser)
    }
    const fetchUserAddresses = async () => {
      const userAddresses = await getUserAdresses()
      setAddresses(userAddresses)
    }

    fetchUser()
    fetchUserAddresses()

  }, [])

  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(prevId => (prevId === id ? null : id));
  };

  const handleDeleteAddress = async () => {
    if (!selectedAddressId) {
      alert("No address selected.");
      return;
    }

    try {
      await api.delete(`/api/useraddresses/delete/${selectedAddressId}/`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      setAddresses(prev => prev?.filter(address => address.id !== selectedAddressId) || []);
      setSelectedAddressId(null);
      window.location.reload()
    } catch (error) {
      alert(`Failed to delete address: ${error}`);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[70%] flex flex-col gap-7">
        <div className="w-full flex justify-center items-center mt-10 mb-4 md:mb-0">
          <Image src={"/img/blackLogoFixedHeight.png"} width={130} height={130} alt="blackLogo" className="ml-8" />
        </div>
        <div className="flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
              {user?.avatar ? (
                <Image src={user.avatar} fill alt="userAvatar" className="object-cover" />
              ) : (
                <Image src={"/img/blackUser.svg"} fill alt="userBlackAvatar" className="object-contain p-8" />
              )}
            </div>
            <div className="flex flex-col ml-3 mt-3 sm:mt-0 text-center sm:text-start">
              <span className="text-[18px] font-bold">{user?.firstName} {user?.lastName}</span>
              <span className="text-gray-400">{user?.username}</span>
            </div>
          </div>
          <EditUserPhoto />
        </div>
        {user && (
          <div>
            <UserDetails user={user} />
          </div>
        )}
        <div>
          <div className="font-medium mb-2">Addresses</div>
          <div className="flex items-end gap-3">
            <AddressArea
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelectAddress={handleSelectAddress}
            />
            <Button onClick={handleDeleteAddress} disabled={!selectedAddressId}>Delete address</Button>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
