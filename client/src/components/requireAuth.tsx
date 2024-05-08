"use client"
import { getItem } from '@/helpers/persistance-storage';
import { setUserData } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const store = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        async function fetchData() {
            if (!getItem("token") && !store.loggedIn) {
                router.push('/');
            }
            try {
                if (getItem("token") && !store.loggedIn) {
                    const res = await axiosInstance({
                        url: `/users/user`,
                        method: 'GET',
                    });
                    dispatch(setUserData(res?.data?.data?.byId))
                }
            } catch (error) {
                router.push('/');
            }
        }
        fetchData()
    }, [store]);

    return <>{children}</>;
};

export default RequireAuth;
