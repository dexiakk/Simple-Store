"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { format, addDays } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"

export default function DateOfBirthInput({ control, name, label }: DateOfBirthInputProps) {
    const currentYear = new Date().getFullYear();


    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col relative min-w-[120px] w-full">
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full rounded-[12px] text-[13px] lg:text-[14px] py-7 px-6 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span className="text-[15px] md:text-[16px]">{label}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                    if (date) {
                                        const adjustedDate = addDays(date, 1);
                                        field.onChange(adjustedDate);
                                    }
                                }}
                                initialFocus
                                captionLayout="dropdown-buttons"
                                fromYear={1990}
                                toYear={currentYear}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                </FormItem>
            )}
        />
    );
}