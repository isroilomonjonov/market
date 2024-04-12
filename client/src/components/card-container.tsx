import React from 'react'
import Card from './card'
import { PaginationDemo } from './pagination'

const CardContainer = () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    return (
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">{arr.map((i) => <Card key={i} />)}</div>
            <PaginationDemo />

        </div>
    )
}

export default CardContainer