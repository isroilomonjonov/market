import React from 'react'
import { ModeToggle } from './mode-toggle'
import { NavbarMenu } from './navbar-menu'
import { Shield } from 'lucide-react'
import Link from "next/link"

const Navbar = () => {
    return (
        <div className='container pt-2 flex items-center justify-between'>
            <div>
                <Link href={"/"} className='flex gap-2'>
                    <Shield className="h-[2rem] w-[2rem] rotate-0 scale-100 transition-all" />
                    <h1 className="text-3xl font-bold ">Logo</h1>
                </Link>
            </div>
            <NavbarMenu />
            <ModeToggle />
        </div>
    )
}

export default Navbar