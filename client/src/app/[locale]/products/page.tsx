import CardContainer from '@/components/card-container';
import React from 'react'
import { ProductType } from '../../../../interfaces/product-interface';
import { ProductsService } from '@/services/products.service';

const Products = async () => {
    const data: ProductType[] = await ProductsService.getAllProducts();

    return (
        <div>
            <CardContainer data={data} />
        </div>
    )
}

export default Products