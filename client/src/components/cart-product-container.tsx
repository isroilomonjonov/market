import { useAppSelector } from '@/lib/store';
import React from 'react'
import CartProduct from './cart-product';
import { CircleArrowRight } from 'lucide-react';

const CartProductContainer = () => {
    const products = useAppSelector((state) => state.products.products);
    const totalPrice = useAppSelector((state) => state.products.totalPrice);
    return (
        <div className="pt-12">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {products.map((product: any) => (
                <CartProduct key={product.id} el={product} />
            ))}
            {products.length > 0 && <button className='flex gap-2 p-4 px-8 border items-center'>Buyurtma berish <CircleArrowRight className='w-6 h-6' /><span className='text-2xl'>${totalPrice}</span></button>}
        </div>
    )
}

export default CartProductContainer