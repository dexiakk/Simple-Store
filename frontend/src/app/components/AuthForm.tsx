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
import { Input } from "@/components/ui/input"
import { ACCESS_TOKEN, authFormSchema, REFRESH_TOKEN } from "@/lib/utils"
import { LucideLoader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import CustomInput from "./CustomInput"
import DateOfBirthInput from "./DateOfBirthInput"
import PreferedGenderInput from "./PreferedGenderInput"
import api from "@/lib/api"

export default function AuthForm() {
    const [type, setType] = useState("sign-in")
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [IsLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    useEffect(() => {
        
        user && router.push("/");
    }, [user]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const { email, password, firstName, lastName, preferedGender } = data;
        const dateOfBirth = data.dateOfBirth ? data.dateOfBirth.toISOString().split("T")[0] : null;

        try {
            if (type === "sign-in") {
                const log = await api.post("/api/token/", { username: email, password })
                localStorage.setItem(ACCESS_TOKEN, log.data.access)
                localStorage.setItem(REFRESH_TOKEN, log.data.refresh)
            }else if(type === "sign-up"){
                const reg = await api.post("/api/auth/register/", {
                    username: email,
                    password,
                    firstName,
                    lastName,
                    preferedGender,
                    dateOfBirth,
                })
                const log = await api.post("/api/token/", { username: email, password })
                localStorage.setItem(ACCESS_TOKEN, log.data.access)
                localStorage.setItem(REFRESH_TOKEN, log.data.refresh)
            }

            router.push("/")
        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false)
        }

    };

    const handleFormChange = () => {
        type === "sign-in" ? setType("sign-up") : setType("sign-in")
    }

    return (
        <section className="flex justify-center">
            <div className="min-w-[330px] w-[20%]">
                <Image src={"/img/blackLogo.png"} width={130} height={130} alt="logo" />
                <div className="flex flex-col items-center">
                    {type === 'sign-in'
                        ? (<>
                            <span className="text-[25px] font-bold pb-9">Zaloguj się!</span>
                        </>)
                        : (<>
                            <span className="text-[25px] font-bold pb-9">Zarejestruj się!</span>
                        </>)}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-7 flex flex-col">
                            <CustomInput
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />

                            {type === "sign-up" && (
                                <>
                                    <div className="flex justify-between gap-2">
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
                                </>
                            )}

                            <CustomInput
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                            />

                            {type === "sign-up" && (
                                <>

                                    <div className="w-full flex justify-between gap-2">
                                        <DateOfBirthInput
                                            control={form.control}
                                            name="dateOfBirth"
                                            label="Date of Birth"
                                        />

                                        <PreferedGenderInput
                                            control={form.control}
                                            name="preferedGender"
                                            label="Prefered Gender"
                                            placeholder="Enter your prefered gender"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex flex-col gap-4">
                                <Button type="submit" className="rounded-[12px] text-[17px] py-7" disabled={IsLoading}>
                                    {IsLoading ? (
                                        <>
                                            <LucideLoader2 size={20} className="animate-spin" />
                                            &nbsp; Loading...
                                        </>
                                    ) : type === "sign-in"
                                        ? "Sign In" : "Sign Up"}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <button onClick={handleFormChange} className="w-full mt-2 text-start text-gray-500">
                        {type === "sign-in" ? "Don't have an account yet?" : "Already have an account?"}
                    </button>

                    {type === "sign-in" && <hr className="h-[150px] border-none" />}
                </div>
            </div>
        </section>
    )
}
