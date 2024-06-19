'use client'
import Image from 'next/image';
import { usePathname, useRouter } from '../navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export function ToggleLanguage({ locale, navAllText }: { locale: string, navAllText: any }) {
    const pathname = usePathname();
    const router = useRouter();
    if (!pathname) {
        throw new Error("pathname is null");
    }
    if (!router) {
        throw new Error("router is null");
    }
    if (!locale) {
        throw new Error("locale is null");
    }
    if (!navAllText) {
        throw new Error("navAllText is null");
    }
    return (
        <Select defaultValue={locale} onValueChange={(value) => {
            if (pathname === "/products/[id]") {
                return router.replace('/', { locale: value });;
            } if (pathname === "/cart" || pathname === "/categories" || pathname === "/" || pathname === "/contacts" || pathname === "/dashboard" || pathname === "/orders" || pathname === "/products" || pathname === "/products-for-admin" || pathname === "/products-for-admin/new" || pathname === "/settings") {
                router.replace(pathname, { locale: value });
            }
        }}>
            <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{navAllText?.changeLanguageText}</SelectLabel>
                    <SelectItem onClick={() => { router.replace({ pathname, query: { locale: 'en' }, params: { id: "1" } }); }} value="en"><Image src="/en.svg" alt="en" width={20} height={20} /></SelectItem>
                    <SelectItem onClick={() => { router.replace({ pathname, query: { locale: 'ru' }, params: { id: "" } }); }} value="ru"><Image src="/ru.svg" alt="ru" width={20} height={20} /></SelectItem>
                    <SelectItem onClick={() => { router.replace({ pathname, query: { locale: 'uz' }, params: { id: "" } }); }} value="uz"><Image src="/uz.svg" alt="uz" width={20} height={20} /></SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
