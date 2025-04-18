'use client'
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { NavbarMenu } from './navbar-menu'
import { ShoppingBag, Menu, X, ShoppingCart, ShoppingBasket } from 'lucide-react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ToggleLanguage } from './toggle-language'
import { useTranslations } from 'next-intl'
import { NavbarType } from './../../interfaces/navbar-interface';
import { useAppSelector } from '@/lib/store'
import ReduxProvider from '@/app/[locale]/storeProvider'
import LogOutComponent from './logOutComponent'

const Navbar = ({ locale, navItems, navAllText }: { locale: string, navItems: NavbarType[], navAllText: any }) => {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false)
    }, [pathname])
    return (
        <ReduxProvider>
            <div className='flex justify-center mb-[61px]'>
                <div className='sm:container fixed z-10 top-0 pt-4 flex items-center flex-wrap bg-white dark:bg-[#121212] justify-between p-3 border-b border-gray-200 dark:border-gray-600 w-[100vw]'>
                    <button aria-label="barsicon" onClick={() => setOpen(!open)} className='md:hidden  p-1 md:p-2 scale-150 active:scale-100 transition-all duration-200'>{open ? <X className='text-eGlobalColorPrimary w-4 h-4 ' /> : <Menu className='text-eGlobalColorPrimary w-4 h-4 ' />}</button>
                    <div>
                        <Link href={"/"} className='flex gap-2'>
                            <Image src="/logo.svg" alt="logo" className='w-[21px] h-[39px] mr-[5px]' width={100} height={100} />
                            <h1 className="text-3xl font-medium ">Salatri.</h1>
                        </Link>
                    </div>
                    <div className={`gap-5 flex flex-col sm:flex-row sm:justify-center sm:items-center mt-6 pt-16 md:pt-0 md:mt-0 p-8 sm:p-0 absolute bg-white dark:bg-[#121212] w-[100%] transition-[left] duration-500 left-[-100%] top-[61px] h-[100vh] !bg z-20 md:bg-tranparent md:z-auto  md:static md:w-auto md:flex-row md:h-auto md:flex md:gap-8 ${open ? "left-[0%]" : ""}`}>
                        <NavbarMenu navItems={navItems} locale={locale} />
                        <div className='flex items-center justify-center sm:hidden gap-4'>
                            <ToggleLanguage locale={locale} navAllText={navAllText} />
                            <ModeToggle navAllText={navAllText} />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <div className='hidden sm:flex gap-4'>
                            <ToggleLanguage locale={locale} navAllText={navAllText} />
                            <ModeToggle navAllText={navAllText} />
                        </div>
                        <LogOutComponent />
                    </div>
                </div>
            </div>
        </ReduxProvider>

    )
}

export default Navbar