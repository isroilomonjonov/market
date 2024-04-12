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
    return (
        <Select defaultValue={locale} onValueChange={(value) => { router.replace(pathname, { locale: value }); }}>
            <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{navAllText?.changeLanguageText}</SelectLabel>
                    <SelectItem onClick={() => { router.replace(pathname, { locale: 'en' }); }} value="en"><Image src="/en.svg" alt="en" width={20} height={20} /></SelectItem>
                    <SelectItem onClick={() => { router.replace(pathname, { locale: 'ru' }); }} value="ru"><Image src="/ru.svg" alt="ru" width={20} height={20} /></SelectItem>
                    <SelectItem onClick={() => { router.replace(pathname, { locale: 'uz' }); }} value="uz"><Image src="/uz.svg" alt="uz" width={20} height={20} /></SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        // <Menubar className="border-none">
        //     <MenubarMenu>
        //         <MenubarTrigger>Language</MenubarTrigger>
        //         <MenubarContent>
        //             <MenubarItem onClick={() => { router.replace(pathname, { locale: 'en' }); }}>
        //                 English
        //             </MenubarItem>
        //             <MenubarItem onClick={() => { router.replace(pathname, { locale: 'ru' }); }}>
        //                 Russian
        //             </MenubarItem>
        //             <MenubarItem onClick={() => { router.replace(pathname, { locale: 'uz' }); }}>
        //                 Uzbek
        //             </MenubarItem>
        //         </MenubarContent>
        //     </MenubarMenu>
        // </Menubar>
    )
}
