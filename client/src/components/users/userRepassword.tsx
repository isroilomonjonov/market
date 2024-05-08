'use client'
import { useAppDispatch, useAppSelector } from '@/lib/store';
import React from 'react'
import { z } from 'zod'
import { useToast } from '../ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '@/utils/axiosInstance';
import { logoutUser } from '@/lib/features/auth/authSlice';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
    password: z.string().min(6, {
        message: "Parol 6ta belgidan kam bo'lmasligi kerak."
    }),
    newPassword: z.string().min(6, {
        message: "Parol 6ta belgidan kam bo'lmasligi kerak."
    }),
})
const UserRepassword = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();
    const { toast } = useToast()
    let form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            newPassword: "",
        }
    })
    const onSubmit = async (data: any) => {
        try {
            const res = await axiosInstance({
                url: `/auth/repassword`,
                data: { ...data, id: user.id },
                method: "POST"
            });
            dispatch(logoutUser())
            router.push('/')
            toast({
                variant: "default",
                title: res.data.message,
            })
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: error.response.data.message,
            })
        }
    }
    return (
        <div>  <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-8 space-y-8">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parol</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="Parolingiz" {...field} />
                            </FormControl>
                            <FormDescription>Foydalanuvchi parolini yozing!</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Yangi Parol</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="Yangi Parol" {...field} />
                            </FormControl>
                            <FormDescription>Yangi parolini yozing!</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Yangilash</Button>
            </form>
        </Form></div>
    )
}

export default UserRepassword