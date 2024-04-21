'use client'
import React from 'react'
import ReduxProvider from '../storeProvider'
import CartProductContainer from '@/components/cart-product-container'

const Cart = () => {
    return (
        <ReduxProvider>
            <div className='container'>
                <CartProductContainer />
            </div>
        </ReduxProvider>

    )
}

export default Cart