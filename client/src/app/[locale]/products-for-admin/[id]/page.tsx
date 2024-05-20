'use client'
import CreateProduct from '@/components/products/createProduct'
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react'
import { ProductType } from '../../../../../interfaces/product-interface';

const UpdateProductPage = ({ params }: { params: { id: string } }) => {
    const [product, setProduct] = useState<ProductType>()
    useEffect(() => {
        getProductById()
    }, [params.id])
    const getProductById = async () => {
        try {
            const res = await axiosInstance({
                url: `/products/${params.id}`,
                method: "GET"
            });
            setProduct(res.data.data.byId);
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <div className="container pt-12">
            <h1 className="text-3xl font-medium mb-4">{`Mahsulotni yangilash! ${params.id}`}</h1>
            <CreateProduct product={product} />
        </div>
    )
}

export default UpdateProductPage