import { addProductToState, deleteProductFromState } from '@/lib/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import React from 'react'
import { ProductType } from '../../interfaces/product-interface';

const AddAndRemoveBtn = ({ el }: { el: ProductType }) => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);
    const existingItem = products.findIndex(
        (product: any) => product.id === el.id
    );
    const product = products[existingItem]

    return (
        <div className='flex gap-3 items-center justify-center'>
            <button className='p-1 sm:p-2 px-3.5 sm:px-5 text-xl sm:text-2xl border rounded' onClick={() => dispatch(deleteProductFromState(el))}>-</button>
            <span className='text-xl sm:text-2xl'>{product?.quantity || 0}</span>
            <button className='p-1 sm:p-2 px-3.5 sm:px-5 text-xl sm:text-2xl border rounded' onClick={() => dispatch(addProductToState(el))}>+</button>
        </div>
    );
}

export default AddAndRemoveBtn