import React from 'react'
import { ProductType } from '../../interfaces/product-interface'
import AddAndRemoveBtn from './addAndRemoveBtn'
import Image from 'next/image'
import { imageURL } from '@/utils/axiosInstance'
import DOMPurify from 'dompurify'

const CartProduct = ({ el }: { el: any }) => {
    const formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const cleanHtmlString = DOMPurify.sanitize(el.description);
    return (
        <div className='flex gap-16 flex-wrap md:flex-nowrap mb-5 border-b-2 border-black dark:border-white p-2'>
            <img className="w-[450px]" src={`${imageURL}${el.image}`} alt={el.title} />
            <div className='flex gap-4 flex-col  dark:border-b md:border-none pb-4 rounded justify-between'>
                <div className='flex  flex-col gap-4'>
                    <h3 className="text-2xl sm:text-3xl">{el.title}</h3>
                    <div className="deangerousDiv" dangerouslySetInnerHTML={{ __html: cleanHtmlString }} />
                </div>
                <div className='flex  items-center gap-4'>
                    <p className="text-xl sm:text-xl">{el.discount ? formatter.format(Number(el.discount)) : formatter.format(Number(el.price))}</p>
                    <AddAndRemoveBtn el={el} />
                    <p className="text-2xl sm:text-2xl">{el.discount ? formatter.format(Math.ceil(el.quantity * el.discount)) : formatter.format(Math.ceil(el.quantity * el.price))}</p>
                </div>
            </div>
        </div>
    )
}

export default CartProduct