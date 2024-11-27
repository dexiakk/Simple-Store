import { useState } from 'react'
import { ACCESS_TOKEN } from '@/lib/utils';
import api from '@/lib/api';
import Image from 'next/image';

export default function UserDetails({ user }: UserDetailsProps) {
    const { firstName, lastName, preferedGender, dateOfBirth, created_at, avatar } = user;
    const [newFirstName, setNewFirstName] = useState<typeof firstName>(firstName);
    const [newLastName, setNewLastName] = useState<typeof lastName>(lastName);
    const [newGender, setNewGender] = useState<typeof preferedGender>(preferedGender);
    const [newPassword, setNewPassword] = useState<string>('');
    const [changePasswordMessage, setChangePasswordMessage] = useState(0)


    const createdAt = created_at
    const date = createdAt ? new Date(createdAt) : null;
    const formattedDate = date && date.toLocaleDateString('en-CA')

    const updateField = async (field: string, value: string) => {
        try {
            const response = await api.patch(
                "/api/userdetails/update/",
                { [field]: value },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                }
            );

            if (value === newPassword) {
                changePasswordMessage != 1 ?
                    setChangePasswordMessage(1) : ""
            }

        } catch (error) {
            if (value === newPassword) {
                changePasswordMessage != 2 ?
                    setChangePasswordMessage(2) : ""
            }
        }
    };

    return (
        <div className='w-full grid md:grid-cols-2 gap-7'>
            <div className='w-full md:max-w-[650px] flex flex-col gap-2'>
                <label className='font-medium'>First Name</label>
                <div className='flex'>
                    <input
                        type='text'
                        value={newFirstName || ''}
                        onChange={(e) => setNewFirstName(e.target.value)}
                        className='w-full min-w-[100px] bg-[#F9F9F9] py-2 pl-5 rounded-l-[7px] rounded-r-none flex-1'
                    />
                    <button
                        onClick={() => updateField('firstName', newFirstName || '')}
                        className='bg-black text-white px-2 py-2 hover:bg-gray-700 w-[41px] min-w-[41px]'
                    >
                        <Image src={"/img/apply.svg"} width={25} height={25} alt='tick' />
                    </button>
                </div>
            </div>

            <div className='w-full md:min-w[300px] md:max-w-[650px] flex flex-col gap-2'>
                <label className='font-medium'>Last Name</label>
                <div className='flex'>
                    <input
                        type='text'
                        value={newLastName || ''}
                        onChange={(e) => setNewLastName(e.target.value)}
                        className='w-full min-w-[100px] bg-[#F9F9F9] py-2 pl-5 rounded-l-[7px] rounded-r-none flex-1'
                    />
                    <button
                        onClick={() => updateField('lastName', newLastName || '')}
                        className='bg-black text-white px-2 py-2 hover:bg-gray-700'
                    >
                        <Image src={"/img/apply.svg"} width={25} height={25} alt='tick' />
                    </button>
                </div>
            </div>

            <div className='w-full md:min-w[300px] md:max-w-[650px] flex flex-col gap-2'>
                <label className='font-medium'>Change Password</label>
                <div className='flex'>
                    <input
                        type='password'
                        placeholder='New Password'
                        className='w-full min-w-[100px] bg-[#F9F9F9] py-2 pl-5 rounded-l-[7px] rounded-r-none flex-1'
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                        onClick={() => updateField('password', newPassword)}
                        className='bg-black text-white px-2 py-2 hover:bg-gray-700 w-[41px] min-w-[41px]'
                    >
                        <Image src={"/img/apply.svg"} width={25} height={25} alt='tick' />
                    </button>
                </div>
                {changePasswordMessage === 0 ? "" : changePasswordMessage === 1 ? (
                    <span className='text-green-600'>Password changed corectly.</span>
                ) : (
                    <span className='text-red-500'>Please try again.</span>
                )}
            </div>

            <div className='w-full md:min-w[300px] md:max-w-[650px] flex flex-col gap-2'>
                <label className='font-medium'>Prefered Gender</label>
                <div className='flex'>
                    <select
                        value={newGender || ''}
                        onChange={(e) => {
                            setNewGender(e.target.value);
                        }}
                        className='bg-[#F9F9F9] py-2 pl-5 rounded-l-[7px] rounded-r-none flex-1'
                    >
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='unisex'>Unisex</option>
                    </select>
                    <button
                        onClick={() => updateField('preferedGender', newGender || '')}
                        className='bg-black text-white px-2 py-2 hover:bg-gray-700'
                    >
                        <Image src={"/img/apply.svg"} width={25} height={25} alt='tick' />
                    </button>
                </div>
            </div>

            <div className='w-full md:min-w[300px] md:max-w-[650px] flex flex-col gap-2'>
                <span className='font-medium'>Date of Birth</span>
                <div className='bg-[#F9F9F9] text-gray-400 py-2 pl-5 rounded-[7px]'>
                    {dateOfBirth}
                </div>
            </div>


            <div className='w-full md:min-w[300px] md:max-w-[650px] flex flex-col gap-2'>
                <span className='font-medium'>Account created at</span>
                <div className='bg-[#F9F9F9] text-gray-400 py-2 pl-5 rounded-[7px]'>
                    {formattedDate}
                </div>
            </div>
        </div>
    )
}
