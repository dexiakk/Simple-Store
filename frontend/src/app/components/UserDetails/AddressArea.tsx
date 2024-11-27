import AddressInputField from './AddressInputField'
import Image from 'next/image'

type AddressAreaProps = {
    addresses: AddressProps[] | AddressProps | null;
    selectedAddressId: number | null;
    onSelectAddress: (id: number) => void;
}

interface AddressProps {
    id: number | null;
    street: string | null;
    house_number: string | null;
    city: string | null;
    postal_code: string | null;
    country: string | null;
}


export default function AddressArea({ addresses, selectedAddressId, onSelectAddress }: AddressAreaProps) {
    const isMultipleAddresses = Array.isArray(addresses);

    if (isMultipleAddresses) {
        return (
            <div className='flex gap-2'>
                {addresses && addresses.map((address) => (
                    <div key={address.id} onClick={() => onSelectAddress(address.id!)} className={`max-w-[300px] px-3 py-2 border-2 rounded-[15px] cursor-pointer ${selectedAddressId === address.id ? ' border-black bg-gray-100 ' : ''}`}>
                        <div>
                            <div>
                                <span>{address.street}&nbsp;</span>
                                <span>{address.house_number}</span>
                            </div>
                            <div>
                                <span>{address.postal_code}&nbsp;</span>
                                <span>{address.city}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>{address.country}</span>
                                <AddressInputField address={address} type="existAddress" />
                            </div>
                        </div>
                    </div>
                ))}

                {addresses && addresses.length < 2 && (
                    <div className='max-w-[300px] flex flex-col justify-center items-center px-3 py-2 border-2 rounded-[15px]'>
                        <span>Add your address</span>
                        <AddressInputField address={null} type='newAddress' />
                    </div>
                )}
            </div>
        );
    } else {
        const address = addresses;
        if(address)
        return (
            <div className="address-card max-w-[300px] px-3 py-2 border-2 rounded-[15px]">
                <div>
                    <div>
                        <span>{address.street}&nbsp;</span>
                        <span>{address.house_number}</span>
                    </div>
                    <div>
                        <span>{address.postal_code}&nbsp;</span>
                        <span>{address.city}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>{address.country}</span>
                    </div>
                </div>
            </div>
        );
    }
}

