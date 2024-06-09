import React, { useEffect } from 'react'
import ShoppingBasketComponent from './shopping-basket'
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { LogOutIcon } from 'lucide-react'
import { Button } from './ui/button';
import { logoutUser, setUserData } from '@/lib/features/auth/authSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Link } from '@/navigation';
import { getItem } from '@/helpers/persistance-storage';
import axiosInstance from '@/utils/axiosInstance';
import { setState } from '@/lib/features/products/productsSlice';

const LogOutComponent = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
    const store = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const productsStr = getItem("products");
        let products = [];
        if (productsStr) {
            try {
                products = JSON.parse(productsStr);
            } catch (e) {
                console.error("Failed to parse products:", e);
            }
        }
        dispatch(setState({
            products: products,
            totalPrice: products.reduce(
                (total: number, product: any) =>
                    total +
                    product.quantity *
                    (product.discount ? Number(product.discount) : Number(product.price)),
                0
            ),
            totalProducts: products.reduce(
                (total: number, product: any) => total + product.quantity,
                0
            ),
        }))
        async function fetchData() {
            try {
                if (getItem("token") && !store.loggedIn) {
                    const res = await axiosInstance({
                        url: `/users/user`,
                        method: 'GET',
                    });
                    dispatch(setUserData(res?.data?.data?.byId))
                }

            } catch (error) {

            }
        }

        fetchData()
    }, []);
    return (
        isLoggedIn ?
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-2 dark:bg-black p-2 w-56 mt-2 rounded-xl">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='mb-2 p-1'>
                            <Link href={'/settings'}>Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='mb-2 p-1'>
                            <Link href={'/products-for-admin'}>Products</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='mb-2 p-1'>
                            <Link href={'/categories'}>Kategoriyalar</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Button onClick={() => dispatch(logoutUser())} variant={'ghost'}><LogOutIcon className='w-8 h-8 text-red-500' /></Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> : <ShoppingBasketComponent />

    )
}

export default LogOutComponent