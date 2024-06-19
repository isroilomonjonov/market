'use client'
import InnerCardMainInfo from '@/components/inner-card-main-info'
import React, { useEffect, useState } from 'react'
import ReduxProvider from '../../storeProvider'
import axiosInstance from '@/utils/axiosInstance'
import { ProductType } from '../../../../../interfaces/product-interface'

const ProductInner = ({ params }: { params: { id: string } }) => {
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
        <ReduxProvider>
            <div>
                {product && <InnerCardMainInfo el={product} />}
            </div>
        </ReduxProvider>
    )
}

export default ProductInner