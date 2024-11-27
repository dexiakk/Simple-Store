'use client'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
import { Input } from '@/components/ui/input'

export default function CustomInput({ control, name, label, placeholder }: CustomInputProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="w-full relative">
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                id={name}
                                placeholder={label}
                                className="rounded-[12px] text-[17px] py-7"
                                type={name === "password" ? "password" : "text"}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                    </div>
                </div>
            )}
        />
    )
}
