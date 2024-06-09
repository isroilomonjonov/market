'use client'
import RequireAuth from '@/components/requireAuth'
import React from 'react'
import OrdersContainer from '@/components/orders/orders'
import ReduxProvider from '@/app/[locale]/storeProvider'
const OrderPageContainer = ({ productText }: { productText: any }) => {
    return (
        <ReduxProvider>
            <RequireAuth>
                <div className='container pt-12'>Buyurtmalar</div>
                <OrdersContainer productText={productText} />
            </RequireAuth>
        </ReduxProvider>
    )
}

export default OrderPageContainer