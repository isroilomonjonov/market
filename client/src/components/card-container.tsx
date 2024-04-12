import React from 'react'
import Card from './card'
import { PaginationDemo } from './pagination'

const CardContainer = () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    return (
        <div className="container px-5 py-24 mx-auto text-center">
            <div className="flex flex-wrap items-center justify-center gap-12">{arr.map((i) => <Card key={i} />)}</div>
            <PaginationDemo />

        </div>
    )
}

export default CardContainer