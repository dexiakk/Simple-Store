'use client'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { ACCESS_TOKEN, authFormSchema, helpFormSchema, REFRESH_TOKEN } from "@/lib/utils"
import { LucideLoader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import CustomInput from "../Auth/CustomInput"

export default function HelpForm() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [IsLoading, setIsLoading] = useState(false)

    const formSchema = helpFormSchema

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            subject: "",
            description: "",
        },
    })

    useEffect(() => {

        user && router.push("/");
    }, [user]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            const request = await api.post("/api/questions-create/", {
                user_email: data.email,
                user_firstName: data.firstName,
                user_lastName: data.lastName,
                subject: data.subject,
                description: data.description,
            })

            alert("Question send succesfuly!")

            window.location.reload()

        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false)
        }

    };

    return (
        <section className="flex justify-center mt-5">
            <div className="min-w-[330px] w-full">
                <div className="w-full flex justify-center text-center pt-5 pb-7">
                    <span className="font-bold text-2xl md:text-3xl lg:text-4xl">Got a <span className="text-red-500">Question</span>?<br /> We're Here to Help!</span>
                </div>
                <div className="flex flex-col items-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-7 flex flex-col">
                            <CustomInput
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <div className="flex gap-2 md:gap-4">
                                <CustomInput
                                    control={form.control}
                                    name="firstName"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                />

                                <CustomInput
                                    control={form.control}
                                    name="lastName"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                />
                            </div>

                            <CustomInput
                                control={form.control}
                                name="subject"
                                label="Subject"
                                placeholder="Enter the subject"
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
            </div>
        </section>
    )
}
