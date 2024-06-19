'use client'
import axiosInstance from '@/utils/axiosInstance'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import ImageUploader from '../imageUploader'
import MaskedInput from 'react-text-mask';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { toast } from '../ui/use-toast'
import { useRouter } from '@/navigation'
import { ProductType } from '../../../interfaces/product-interface'
import { CategoryType } from '../../../interfaces/category-interface'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const formSchema = z.object({
    title: z.string({ required_error: "Mah'sulot nomini yozishingiz shart!", }).min(2, { message: "Eng kamida 2ta harfli mahsulot bo'lishi kerak!" }),
    price: z.string({ required_error: "Mah'sulot narxini yozishingiz shart!", }),
    description: z.string({ required_error: "Mah'sulot haqida ma'lumot yozishingiz shart!", }),
    discount: z.string().optional(),
    categoryId: z.string({ required_error: "Kategoriya tanlang!", }),
})
export interface ImageType {
    createdAt: string;
    id: number;
    isConnect: boolean;
    name: string;
    originalName: string;
    size: string;
    type: string;
    updatedAt: string;
}
const CreateProduct = ({ product }: { product?: ProductType }) => {
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

    const [categories, setCategories] = useState([])
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: "",
            description: "",
            discount: "",
            categoryId: ""
        },
    })
    useEffect(() => {
        getCategories()
        if (product) {
            console.log(product.category.id);

            form.reset({ ...product, categoryId: String(product.category.id) })
            setSelectedImage(product.attachment)
            console.log({ ...product, categoryId: String(product.category.id) });

        }
    }, [product])
    const getCategories = async () => {
        try {
            const res = await axiosInstance({
                url: "/categories",
                method: "GET"
            });
            setCategories(res.data.data.allCategory.rows.map((el: CategoryType) => { return { ...el, id: String(el.id) } }));
        } catch (error: any) {
            console.log(error);
        }
    }
    const onSubmit = async (data: any) => {
        console.log({ ...data, attachmentId: selectedImage?.id, image: selectedImage?.name });
        if (data.discount.length === 0) {
            delete data.discount
        }
        try {
            const res = await axiosInstance({
                url: product ? `/products/${product.id}` : "/products",
                data: { ...data, attachmentId: selectedImage?.id, image: selectedImage?.name, categoryId: Number(data.categoryId) },
                method: product ? "PATCH" : "POST"
            });
            router.push("/products-for-admin");
            toast({
                variant: "default",
                title: product ? "Mahsulot ma'lumotlari yangilandi" : "Mahsulot yaratildi",
            })
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: error.response.data.message,
            })
        }
    }
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            ['link'],
            ['clean']
        ],
    }), []);

    // Quill formats
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'color', 'background', 'align'
    ];
    return (
        <div>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mahsulot nomi</FormLabel>
                                <FormControl>
                                    <Input type={'text'} {...field} />
                                </FormControl>
                                <FormDescription>Mahsulot nomini kiriting!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mahsulot haqida yozing!</FormLabel>
                                <FormControl>
                                    <ReactQuill {...field} value={field.value}
                                        onChange={field.onChange} modules={modules}
                                        formats={formats} />
                                </FormControl>
                                <FormDescription>{`Mahsulot haqida ma'lumot yozing!`}</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mahsulot narxi 10.000!</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormDescription>Mahsulot narxini yozing!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mahsulot narxi skidkada 8.000!</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormDescription>Mahsulot narxi skidkada kiritmasangiz asosiy narxni oladi!</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategoriya</FormLabel>
                                {product && <p>Oldingi kategoriya <span className='text-xl font-bold'>{product?.category?.title}</span></p>}
                                <Select onValueChange={field.onChange} defaultValue={String(product?.category?.id)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category: CategoryType) => <SelectItem key={category.id} value={String(category.id)}>{category.title}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Kategoriyani tanlang!
                                </FormDescription>
                                <FormMessage />
                            </FormItem>)}
                    />
                    <ImageUploader selectedImage={selectedImage} setSelectedImage={(e: ImageType | null) => { setSelectedImage(e); return {}; }} />
                    <Button type="submit">{product ? "Yangilash" : "Yaratish"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateProduct