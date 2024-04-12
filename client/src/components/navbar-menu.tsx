"use client"

import * as React from "react"
import { Link } from '../navigation';
import { usePathname } from "next/navigation";
import { NavbarType } from "../../interfaces/navbar-interface";


export function NavbarMenu({ navItems, locale }: { navItems: NavbarType[], locale: string }) {
    const pathname = usePathname();
    return (
        <div>
            <ul className="gap-6 flex flex-col md:flex-row">
                {navItems.map((item) => (
                    <li key={item.name} className={`border-b-2 ${pathname == `/${locale}${item.href === "/" ? "" : item.href}` ? "border-[#52A742]" : "border-transparent"} hover:border-b-2 hover:border-[#52A742] transition`}>
                        <Link href={item.href}>
                            <p className="font-medium text-base">
                                {item.name}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

