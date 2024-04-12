'use client'
import React from 'react'
import { useInView } from 'react-intersection-observer';

const Card = () => {
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });
    return (
        <div ref={ref} className={`${inView ? "animation-diff" : ""} cursor-pointer w-full max-w-96 hover:scale-105 transition-transform ease-out duration-200 rounded shadow-2xl`}>
            <a className="block relative h-48 overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="/hero-image.png" />
            </a>
            <div className="mt-4 pb-4 rounded">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                <h2 className="title-font text-lg font-medium">The Catalyzer</h2>
                <p className="mt-1">$16.00</p>
            </div>
        </div>
    )
}

export default Card