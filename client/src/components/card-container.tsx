import React from 'react'
import Card from './card'
import { PaginationDemo } from './pagination'
import { ProductsData } from '@/data/products'

const CardContainer = () => {
    return (
        <div className="container px-5 py-24 mx-auto text-center">
            <div className="flex flex-wrap items-center justify-center gap-12">{ProductsData.map((i) => <Card key={i.id} el={i} />)}</div>
            <PaginationDemo />

        </div>
    )
}

export default CardContainer