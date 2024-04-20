'use client'
import InnerCardMainInfo from '@/components/inner-card-main-info'
import { ProductsData } from '@/data/products'
import React from 'react'
import ReduxProvider from '../../storeProvider'
import AuthUpdater from '@/components/redux-component-test'

const ProductInner = ({ params }: { params: { id: string } }) => {
    const el = ProductsData.find(el => el.id === Number(params.id))
    return (
        <ReduxProvider>
            <div>
                {el && <InnerCardMainInfo el={el} />}
            </div>
        </ReduxProvider>
    )
}

export default ProductInner