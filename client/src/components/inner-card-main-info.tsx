import React from 'react'
import { ProductType } from '../../interfaces/product-interface'
import { addProductToState } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import AddAndRemoveBtn from './addAndRemoveBtn';
const InnerCardMainInfo = ({ el }: { el: ProductType }) => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);
    const totalPrice = useAppSelector((state) => state.products.totalPrice);
    const exist = products.find((product: any) => product.id === el.id)
    console.log(products, totalPrice);
    return (
        <div><section className="body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={el.image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font opacity-70 tracking-widest">{el.category}</h2>
                        <h1 className=" text-3xl title-font font-medium mb-1">{el.title}</h1>
                        <p className="leading-relaxed">{el.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                            <div className="flex ml-6 items-center">

                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="title-font font-medium text-2xl ">${el.price}</span>
                            {exist ? <AddAndRemoveBtn el={el} /> : <button onClick={() => dispatch(addProductToState(el))} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">ORDER</button>}
                        </div>
                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default InnerCardMainInfo