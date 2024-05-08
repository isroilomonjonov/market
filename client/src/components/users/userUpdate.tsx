'use client'
import React, { useEffect } from 'react'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axiosInstance from '@/utils/axiosInstance'
import { setUserData } from '@/lib/features/auth/authSlice'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { getItem } from '@/helpers/persistance-storage'
const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string().min(2, {
        message: "Username 2ta belgidan kam bo'lmasligi kerak.",
    }),
    password: z.string().min(6, {
        message: "Parol 6ta belgidan kam bo'lmasligi kerak."
    })
})
const UserUpdateComponent = () => {
    const store = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    async function fetchData() {
        try {
            if (getItem("token") && !store.loggedIn) {
                const res = await axiosInstance({
                    url: `/users/user`,
                    method: 'GET',
                });
                dispatch(setUserData(res?.data?.data?.byId))
                return res.data.data.byId
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const { toast } = useToast()
    let form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user?.username || "",
            password: "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || ""
        }
    })
    const onSubmit = async (data: any) => {
        try {
            const res = await axiosInstance({
                url: `/users/${user.id}`,
                data,
                method: "PATCH"
            });
            res.data.data.updatedUser ? dispatch(setUserData(res.data.data.updatedUser)) : ""
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
        <div>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-8 space-y-8">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ismingiz</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ismingiz" {...field} defaultValue={user?.firstName || ""} />
                                </FormControl>
                                <FormDescription>Ismingizni yozing!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Familiyangiz</FormLabel>
                                <FormControl>
                                    <Input placeholder="Familiyangiz" {...field} defaultValue={user?.lastName || ""} />
                                </FormControl>
                                <FormDescription>Familiyangizni yozing!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} defaultValue={user?.username || ""} />
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
                    <Button type="submit">Yangilash</Button>
                </form>
            </Form>
        </div>
    )
}

export default UserUpdateComponent