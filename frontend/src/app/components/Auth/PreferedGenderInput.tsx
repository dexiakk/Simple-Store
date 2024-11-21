"use client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PreferedGenderInput({ control, name, label, placeholder }: CustomInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="min-w-[120px] w-full relative">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full rounded-[12px] text-[15px] sm:text-[16px] lg:text-[17px] py-7 text-muted-foreground">
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="unisex">All</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
        </FormItem>
      )}
    />
  )
}
