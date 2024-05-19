'use client'
import axiosInstance from '@/utils/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { useRouter } from '@/navigation'
const formSchema = z.object({
    title: z.string({ required_error: "Mah'sulot nomini yozishingiz shart!", }).min(2, { message: "Eng kamida 2ta harfli kategoriya bo'lishi kerak!" }),
})
const CreateCategory = ({ closeDialog, id, getAll }: { closeDialog: () => void, id?: number, getAll?: () => Promise<void> }) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })
    useEffect(() => {
        if (id) {
            getCategory()
        }
    }, [id])
    const getCategory = async () => {
        try {
            const res = await axiosInstance({
                url: `/categories/${id}`,
                method: "GET"
            });
            form.reset(res.data.data.byId);
        } catch (error: any) {
            console.log(error);
        }
    }

    const onSubmit = async (data: any) => {
        try {
            const res = await axiosInstance({
                url: id ? `/categories/${id}` : "/categories",
                data,
                method: id ? "PATCH" : "POST"
            });
            closeDialog();
            getAll && getAll();
            toast({
                variant: "default",
                title: id ? "Kategoriya yangilandi" : "Kategoriya yaratildi",
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategoriya nomi</FormLabel>
                                <FormControl>
                                    <Input type={'text'} {...field} />
                                </FormControl>
                                <FormDescription>Kategoriya nomini kiriting!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{id ? "Yangilash" : "Yaratish"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateCategory;