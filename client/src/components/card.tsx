'use client'
import React from 'react'
import { useInView } from 'react-intersection-observer';
import { ProductType } from '../../interfaces/product-interface';
import { Link } from '@/navigation';
import { useAppSelector } from '@/lib/store';
import { imageURL } from '@/utils/axiosInstance';

const Card = ({ el }: { el: ProductType }) => {
    const products = useAppSelector((state) => state.products.products);
    const existingItem = products.findIndex((product: any) => product.id === el.id);
    const formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return (
        // <div ref={ref} className={`${inView ? "animation-diff" : ""} relative cursor-pointer w-full max-w-96 hover:scale-105 transition-transform ease-out duration-200 rounded shadow-2xl`}>
        <div className={`relative cursor-pointer w-full max-w-96 hover:scale-105 transition-transform ease-out duration-200 rounded shadow-2xl`}>
            {products[existingItem]?.quantity > 0 && <span className={`absolute z-[2] -top-[10%] -left-5 bg-[#52A742] flex items-center justify-center w-16 h-16 text-center rounded-full text-white`}>{products[existingItem].quantity}</span>}
            <Link href={{
                pathname: '/products/[id]',
                params: { id: el.id }
            }} className="block relative h-full rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full max-h-48 block" src={`${imageURL}${el.image}`} />
                <div className="mt-4 pb-4 rounded  dark:border-b">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{el.category.title}</h3>
                    <h2 className="title-font text-2xl font-medium">{el.title}</h2>
                    {!el.discount ? <p className="mt-1 text-xl font-bold">{formatter.format(Number(el.price))}</p> : <><p className="mt-1 text-xl font-bold">{formatter.format(Number(el.discount))}</p>
                        <p className="mt-1 line-through decoration-red-600 opacity-70">{formatter.format(Number(el.price))}</p></>}
                </div>
            </Link>
        </div >
    )
}

export default Card