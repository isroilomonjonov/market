'use client'
import React, { useEffect, useState } from 'react'
import Card from './card'
import { PaginationDemo } from './pagination'
import ReduxProvider from '@/app/[locale]/storeProvider'
import { ProductType } from '../../interfaces/product-interface'
import axiosInstance from '@/utils/axiosInstance'
import { PaginationType } from '../../interfaces/pagination-interface'
import { useSearchParams } from 'next/navigation'
import { CategoryType } from '../../interfaces/category-interface'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import SearchIcon from '@/assets/search'
import { useRouter } from '@/navigation'

const CardContainer = ({ productText }: { productText: any }) => {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<ProductType[]>([])
    const [pagination, setPagination] = useState<PaginationType>()
    const [categories, setCategories] = useState([])
    const [categoryId, setcategoryId] = useState(searchParams.get('categoryId') || "")
    const [search, setSearch] = useState(searchParams.get('search') || "")
    const [slider, setSlider] = useState(false);
    const router = useRouter();
    let page = searchParams.get('page') || 1;
    let size = searchParams.get('size') || 9;
    useEffect(() => {
        getAllProducts();
    }, [page, size, categoryId, search])
    const searchFn = (val: string) => {
        router.push({ pathname: `/products`, query: { page: 1, size, search: val, categoryId } });
        setSearch(val)
    }
    const categoryFn = (val: string) => {
        router.push({ pathname: `/products`, query: { page: 1, size, search, categoryId: val === "all" ? "" : val } });
        setcategoryId(val)
    }
    const getAllProducts = async () => {
        try {
            setSlider(true)
            console.log(page);

            const res = await axiosInstance({
                url: `/products${page ? `?page=${page}&size=${size}` : ''}${page && categoryId.length != 0 && categoryId !== "all" ? "&categoryId=" + categoryId : ""}${page && search.length > 0 ? `&search=${search}` : ""}`,
                method: "GET"
            });
            setPagination(res.data.data.allProduct.pagination);
            setProducts(res.data.data.allProduct.content);
            getCategories()
        } catch (error: any) {
            console.log(error);
        } finally {
            setSlider(false)
        }
    }
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
    return (
        <ReduxProvider>
            <div className="container px-5 py-16 mx-auto text-center">
                <h1 className='text-3xl font-medium mb-3 text-start'>{productText.Products}</h1>
                <div className='flex mb-8 gap-8'>
                    <div className='w-1/3'>
                        <Select onValueChange={(val) => { categoryFn(val) }} value={categoryId}>
                            <SelectTrigger>
                                <SelectValue placeholder={productText.Categories} />
                            </SelectTrigger>
                            <SelectContent>

                                {categories.map((category: CategoryType) => <SelectItem key={category.id} value={String(category.id)}>{category.title}</SelectItem>)}
                                <SelectItem value={'all'}>{productText.All}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='relative sm:min-w-[350px] w-full'>
                        <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2" />
                        <Input onChange={(e) => { searchFn(e.target.value) }} className=' text-[#5A5881] text-[14px] leading-4  px-[15px] py-[17px] rounded-[10px] pl-11' placeholder={productText.Search} />
                    </div>
                </div>
                {slider && <div className="loader h-screen">Loading....</div>}
                {(products.length > 0 && pagination && !slider) ? <><div className="flex flex-wrap items-center justify-center gap-12">{products.map((i) => <Card key={i.id} el={i} />)}</div>
                    <PaginationDemo productText={productText} pagination={pagination} /></> : <p>{productText.NoProducts}</p>}
            </div>
        </ReduxProvider>
    )
}

export default CardContainer