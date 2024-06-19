'use client'
import { useAppSelector } from '@/lib/store';
import React from 'react'
import CartProduct from './cart-product';
import { CircleArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import CreateOrder from './orders/createOrder';

const CartProductContainer = ({ text }: { text: any }) => {
    const [dialogOpen, setDialogOpen] = React.useState(false)

    const products = useAppSelector((state) => state.products.products);
    const totalPrice = useAppSelector((state) => state.products.totalPrice);
    const state = useAppSelector((state) => state);
    const formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return (
        <div className="pt-12">
            {products.length === 0 && <div className="text-center flex items-center justify-center  "><img src="/empty-shopping-cart.webp" alt="Empty cart" /></div>}
            {products.map((product: any) => (
                <CartProduct key={product.id} el={product} />
            ))}
            {products.length > 0 && <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger onClick={() => setDialogOpen(true)} className='p-2 px-4 rounded-sm'><button className='flex gap-2 p-4 px-8 border items-center'>{text.order} <CircleArrowRight className='w-6 h-6' /><span className='text-2xl'>{formatter.format(Number(totalPrice))}</span></button></DialogTrigger>
                <DialogContent>
                    <CreateOrder closeDialog={() => setDialogOpen(false)} text={text} />
                </DialogContent>
            </Dialog>}
            {/* {products.length > 0 && <button className='flex gap-2 p-4 px-8 border items-center'>{text.order} <CircleArrowRight className='w-6 h-6' /><span className='text-2xl'>{formatter.format(Number(totalPrice))}</span></button>} */}
        </div>
    )
}

export default CartProductContainer