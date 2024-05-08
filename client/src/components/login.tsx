'use client'
import React from 'react'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import axiosInstance from '@/utils/axiosInstance'
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { signUserSuccess } from '@/lib/features/auth/authSlice'

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username 2ta belgidan kam bo'lmasligi kerak.",
    }),
    password: z.string().min(6, {
        message: "Parol 6ta belgidan kam bo'lmasligi kerak."
    })
})
const LoginComponent = () => {
    const dispatch = useAppDispatch();
    const { toast } = useToast()
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })
    const onSubmit = async (data: any) => {
        try {
            const res = await axiosInstance({
                url: "/auth/login",
                data,
                method: "POST"
            });
            console.log(res);
            res.data.data.user ? dispatch(signUserSuccess(res.data.data.user)) : "";
            router.push('/');
            toast({
                variant: "default",
                title: "Akkauntingizga muvaffaqiyatli kirdingiz",
            })
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: error.response.data.message,
            })
        }
    }
    return (
        <div className='container px-5 py-12'>
            <h1 className='text-3xl mb-8'>Adminlar uchun login qismi!</h1>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormDescription>Foydalanuvchi nomini yozing!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="password" {...field} />
                                </FormControl>
                                <FormDescription>Foydalanuvchi parolini yozing!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Kirish</Button>
                </form>
            </Form>
        </div>
    )
}

export default LoginComponent