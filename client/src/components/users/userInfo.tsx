'use client';
import { useAppSelector } from '@/lib/store';
import React from 'react'
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UserUpdateComponent from './userUpdate';
import UserRepassword from './userRepassword';
const UserInfo = () => {
    const store = useAppSelector((state) => state.auth);

    return (
        <div className="p-4 flex">
            <div className="flex border-2 rounded-lg gap-4 border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                <div className="w-16 h-16 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div className="flex-grow">
                    <h2 className=" text-lg title-font font-medium mb-3">{store.user.firstName} {store.user.lastName}</h2>
                    <h2 className=" text-lg opacity-70">username: {store.user.username}</h2>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <Dialog>
                            <DialogTrigger>Edit</DialogTrigger>
                            <DialogContent>
                                <UserUpdateComponent />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div>
                        <Dialog>
                            <DialogTrigger>Repassword</DialogTrigger>
                            <DialogContent>
                                <UserRepassword />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo