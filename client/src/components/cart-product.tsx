import React from 'react'
import { ProductType } from '../../interfaces/product-interface'
import AddAndRemoveBtn from './addAndRemoveBtn'
import Image from 'next/image'

const CartProduct = ({ el }: { el: any }) => {
    return (
        <div className='flex gap-16 flex-wrap md:flex-nowrap mb-5'>
            <img className="w-64" src={el.image} alt={el.title} />
            <div className='flex gap-4 flex-col  dark:border-b md:border-none pb-4 rounded justify-between'>
                <div className='flex  flex-col gap-4'>
                    <h3 className="text-2xl sm:text-3xl">{el.title}</h3>
                    <p className="text-gray-500 text-lg sm:text-xl">{el.description}</p>
                </div>
                <div className='flex  items-center gap-4'>
                    <p className="text-xl sm:text-2xl">${el.price}</p>
                    <AddAndRemoveBtn el={el} />
                    <p className="text-2xl sm:text-3xl">${Math.ceil(el.quantity * el.price)}</p>
                </div>
            </div>
        </div>
    )
}

export default CartProduct