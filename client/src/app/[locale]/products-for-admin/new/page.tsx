import CreateProduct from '@/components/products/createProduct'
import React from 'react'

const AddNewProduct = () => {
    return (
        <div className="container pt-12">
            <h1 className="text-3xl font-medium mb-4">{`Yangi mahsulot qo'shish!`}</h1>
            <CreateProduct />
        </div>
    )
}

export default AddNewProduct