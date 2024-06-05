'use client'
import React, { useEffect, useState } from 'react'
import Card from './card'
import { PaginationDemo } from './pagination'
import { ProductsData } from '@/data/products'
import ReduxProvider from '@/app/[locale]/storeProvider'
import { ProductType } from '../../interfaces/product-interface'
import axiosInstance from '@/utils/axiosInstance'

const CardContainer = ({ data }: { data?: ProductType[] }) => {
    const [products, setProducts] = useState<ProductType[]>([])
    useEffect(() => {
        if (!data) {
            getAllProducts();
        }
    }, [data])
    const getAllProducts = async () => {
        try {
            const res = await axiosInstance({
                url: "/products",
                method: "GET"
            });
            setProducts(res.data.data.allProduct.content);
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <ReduxProvider>
            <div className="container px-5 py-24 mx-auto text-center">

                {data&&<><div className="flex flex-wrap items-center justify-center gap-12">{data ? data.map((i) => <Card key={i.id} el={i} />) : products.map((i) => <Card key={i.id} el={i} />)}</div>
                <PaginationDemo /></>}

            </div>
        </ReduxProvider>

    )
}

export default CardContainer