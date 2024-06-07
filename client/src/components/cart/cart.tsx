'use client'
import React from 'react'
import CartProductContainer from '@/components/cart-product-container'
import ReduxProvider from '@/app/[locale]/storeProvider'

const CartContainer = ({ text }: { text: any }) => {
    return (
        <ReduxProvider>
            <div className='container'>
                <CartProductContainer text={text} />
            </div>
        </ReduxProvider>
    )
}

export default CartContainer