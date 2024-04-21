'use client'
import { Link } from '@/navigation'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/store';
import { ShoppingBag, Menu, X, ShoppingCart, ShoppingBasket } from 'lucide-react'
import ReactCSSTransitionGroup from 'react-transition-group';
const ShoppingBasketComponent = () => {
    const products = useAppSelector((state) => state.auth.products);
    const totalProducts = useAppSelector((state) => state.auth.totalProducts);
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    useEffect(() => {
        if (totalProducts === 0) return;
        setIsBtnClicked(true);
        const timer = setTimeout(() => {
            setIsBtnClicked(false);
        }, 300);
        return () => clearTimeout(timer)
    }, [totalProducts]);

    return (
        <Link className='relative' href={"/basket"}>
            <span className={`relative ${isBtnClicked ? "scaling" : ""} z-10 right-0 top-[80%] -left-0 bg-[#52A742] inline-block w-full text-center rounded-full text-white`}>{totalProducts}</span>
            <ShoppingBasket className='relative -translate-y-1/3 w-8 h-8' />
        </Link>
    )
}

export default ShoppingBasketComponent