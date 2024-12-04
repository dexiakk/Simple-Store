'use client'
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ACCESS_TOKEN, shoeFormSchema } from "@/lib/utils"
import { LucideLoader2 } from "lucide-react"
import api from "@/lib/api"
import { Input } from '@/components/ui/input'

export default function CreateShoeArea() {
    const [filters, setFilters] = useState<any>(null)
    const [sizes, setSizes] = useState<any>(null)
    const [IsLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchFilters = async () => {
            const resp = await api.get("/api/shoe-filters-with-id/")
                .then(data => data.data.shift())

            setFilters(resp)
        }

        fetchFilters()
    }, [])

    useEffect(() => {
        const fetchSizes = async () => {
            const resp = await api.get("/api/shoe-sizes-with-id-list/")
                .then(data => data.data)

            setSizes(resp)
        }

        fetchSizes()
    }, [])


    const formSchema = shoeFormSchema

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(shoeFormSchema),
        defaultValues: {
            manufacturer: 0,
            category: 0,
            collection: 0,
            model: "",
            price: 0,
            description: "",
            bestseller: false,
            gender: "male",
            shoe_high: "low",
            on_sale: false,
            sale_price: 0,
            shoe_sizes: [],
        },
    })

    const [showSalePrice, setShowSalePrice] = useState(false);

    useEffect(() => {
        const subscription = form.watch((values) => {
            setShowSalePrice(!!values.on_sale);
        });

        return () => subscription.unsubscribe();
    }, [form]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        setIsLoading(true);
        data.price = parseFloat(data.price);

        try {
            const requestData = {
                manufacturer: data.manufacturer,
                model: data.model,
                price: data.price,
                bestseller: data.bestseller,
                on_sale: data.on_sale,
                sale_price: data.sale_price,
                category: data.category,
                collection: data.collection,
                shoe_high: data.shoe_high,
                gender: data.gender,
                description: data.description,
                shoe_sizes: data.shoe_sizes,
            };

            const response = await api.post(
                "/api/shoes/create/",
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );


            alert("Shoe created successfully!");
        } catch (error) {
            alert("Failed to create shoe. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="border-2 rounded-[12px] px-9 py-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-7 flex flex-col">
                    <div className="flex items-center gap-10">
                        <FormField
                            control={form.control}
                            name="manufacturer"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>Manufacturer</FormLabel>
                                    <FormControl>
                                        <select
                                            value={field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className="w-full border rounded custom-select"
                                        >
                                            {filters && filters.manufacturer && filters.manufacturer.map((item: string, index: number) => {
                                                const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                                const { id, brand } = parsedItem;
                                                return (
                                                    <option key={`manufacturer_${id}_${index}`} value={id}>
                                                        {brand}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </FormControl>
                                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <div className="w-full max-w-[250px] relative">
                                    <div className="flex w-full flex-col gap-2">
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="model"
                                                placeholder="Model"
                                                className="custom-input font-medium text-[17px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    <div className="flex items-start items-stretch gap-10">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <div className="w-full max-w-[100px] relative">
                                    <div className="flex flex-col gap-2">
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="price"
                                                placeholder="Price"
                                                type="number"
                                                step="0.01"
                                                className="font-medium text-[17px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                    </div>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bestseller"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Bestseller</FormLabel>
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            className="h-4 w-4"
                                        />
                                    </FormControl>
                                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="on_sale"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3">
                                    <FormLabel>On Sale</FormLabel>
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                                setShowSalePrice(e.target.checked);
                                            }}
                                            className="h-4 w-4"
                                        />
                                    </FormControl>
                                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                </FormItem>
                            )}
                        />

                        {showSalePrice && (
                            <FormField
                                control={form.control}
                                name="sale_price"
                                render={({ field }) => (
                                    <div className="w-full max-w-[100px] relative">
                                        <div className="flex flex-col gap-2">
                                            <FormLabel>Sale Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="sale_price"
                                                    placeholder="Sale Price"
                                                    type="number"
                                                    step="0.01"
                                                    className="font-medium text-[17px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                        </div>
                                    </div>
                                )}
                            />
                        )}
                    </div>

                    <div className="flex gap-10">

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <select
                                            value={field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className="w-full p-2 border rounded custom-select"
                                        >
                                            {filters && filters.category && filters.category.map((item: string, index: number) => {
                                                const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                                const { id, name } = parsedItem;
                                                return (
                                                    <option key={`category_${id}_${index}`} value={id}>
                                                        {name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </FormControl>
                                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="collection"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Collection</FormLabel>
                                    <FormControl className="flex flex-col gap-2">
                                        <select
                                            value={field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className="w-full p-2 border rounded custom-select"
                                        >
                                            {filters && filters.collection && filters.collection.map((item: string, index: number) => {
                                                const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                                const { id, name } = parsedItem;
                                                return (
                                                    <option key={`collection_${id}_${index}`} value={id}>
                                                        {name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </FormControl>
                                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="flex gap-10">
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <select
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            className="w-full p-2 border rounded custom-select"
                                        >
                                            <option value="">Gender</option>
                                            {filters && filters.gender && filters.gender.map((item: string, index: number) => {
                                                const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                                const { id, name } = parsedItem;
                                                return (
                                                    <option key={`gender_${id}_${index}`} value={id}>
                                                        {id}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </FormControl>
                                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="shoe_high"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>Shoe High</FormLabel>
                                    <FormControl>
                                        <select
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            className="w-full p-2 border rounded custom-select"
                                        >
                                            <option value="">Shoe High</option>
                                            {filters && filters.shoe_high && filters.shoe_high.map((item: string, index: number) => {
                                                const parsedItem = JSON.parse(item.replace(/'/g, '"'));
                                                const { id, name } = parsedItem;
                                                return (
                                                    <option key={`shoe_high_${id}_${index}`} value={id}>
                                                        {name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </FormControl>
                                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                </FormItem>
                            )}
                        />

                    </div>



                    <FormField
                        control={form.control}
                        name="shoe_sizes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sizes</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-4">
                                        {sizes && sizes.map((item: { id: number, size: string }, index: number) => (
                                            <div key={`sizes_div_${item.id}_${index}`} className="flex flex-col items-center">
                                                <label key={`sizes_label_${item.id}_${index}`} className="flex items-center">{item.size}
                                                </label>
                                                <input
                                                    key={`sizes_${item.id}_${index}`}
                                                    type="checkbox"
                                                    value={item.id}
                                                    checked={field.value.includes(item.id)}
                                                    onChange={(e) => {
                                                        const selectedValue = Number(e.target.value);
                                                        const newValue = e.target.checked
                                                            ? [...field.value, selectedValue]
                                                            : field.value.filter((id: number) => id !== selectedValue);

                                                        field.onChange(newValue);
                                                    }}
                                                    className="h-4 w-4"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <div className="w-full relative">
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <textarea
                                            id="description"
                                            placeholder="Description of your case."
                                            className="rounded-[12px] text-[17px] h-[200px] py-3 px-4 border-[2px] resize-none focus:border-black focus:border-[1px] outline-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="pl-2 absolute top-full left-0 mt-1 text-xs text-red-500" />
                                </div>
                            </div>
                        )}
                    />


                    <div className="flex flex-col gap-4">
                        <Button type="submit" className="rounded-[12px] text-[17px] py-7" disabled={IsLoading}>
                            {IsLoading ? (
                                <>
                                    <LucideLoader2 size={20} className="animate-spin" />
                                    &nbsp; Loading...
                                </>
                            ) : "Send"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>

    )
}
