'use client'
import axiosInstance from '@/utils/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from '@/navigation'
import MaskedInput from 'react-text-mask';
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { clearProducts } from '@/lib/features/products/productsSlice'
import { useToast } from '../ui/use-toast'
const formSchema = z.object({
    name: z.string().min(2),
    phoneNumber: z.string().min(2),
})
const CreateOrder = ({ closeDialog, text }: { closeDialog: () => void, text: any }) => {
    const products = useAppSelector((state) => state.products.products);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phoneNumber: ""
        },
    })

    const onSubmit = async (data: any) => {
        console.log({ ...data, items: products });
        try {
            const res = await axiosInstance({
                url: "/orders",
                data: { ...data, items: products },
                method: "POST"
            });
            closeDialog();
            dispatch(clearProducts())
            router.push("/")
            return toast({ title: text.orderCompletedSuccesufly })
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{text.name}</FormLabel>
                                <FormControl>
                                    <Input type={'text'} {...field} />
                                </FormControl>
                                <FormDescription>{text.name}</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{text.phoneNumber}</FormLabel>
                                <FormControl>
                                    <MaskedInput
                                        mask={['+', '9', '9', '8', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                        placeholderChar={'\u2000'}
                                        showMask={false}
                                        id="phone"
                                        type="text"
                                        placeholder="+998 (__) ___-__-__"
                                        {...field}
                                        className='flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300'
                                    />
                                </FormControl>
                                <FormDescription>{text.phoneNumber}</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{text.order}</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateOrder;