'use client'
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react'
import { TableForOrders } from '../tables/table-for-orders';
import { PaginationDemo } from '../pagination';
import { PaginationType } from '../../../interfaces/pagination-interface';
import { useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from '@/navigation';

const OrdersContainer = ({ productText }: { productText: any }) => {
    const searchParams = useSearchParams();
    const [pagination, setPagination] = useState<PaginationType>();
    const [status, setStatus] = useState(searchParams.get('status') || "all")
    const router = useRouter();
    let page = searchParams.get('page') || 1;
    let size = searchParams.get('size') || 9;
    useEffect(() => {
        getOrders();
    }, [page, size, status])
    const getOrders = async () => {
        try {
            const res = await axiosInstance({
                url: `/orders${page ? `?page=${page}&size=${size}` : ''}${page && status.length != 0 && status !== "all" ? "&status=" + status : ""}`,
                method: "GET"
            });
            setPagination(res.data.data.allOrders.pagination);
        } catch (error: any) {
            console.log(error);
        }
    }
    const statusFn = (val: string) => {
        router.push({ pathname: `/orders`, query: { page: 1, size, status: val === "all" ? "" : val } });
        setStatus(val)
    }
    return (
        <div className='container pt-12'>
            <div className='mb-5'>
                <Select onValueChange={(val) => { statusFn(val) }} value={status}>
                    <SelectTrigger>
                        <SelectValue placeholder={productText.Categories} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'pending'}>Yangi</SelectItem>
                        <SelectItem value={'completed'}>Yakunlangan</SelectItem>
                        <SelectItem value={'canceled'}>Bekor qilingan</SelectItem>
                        <SelectItem value={'all'}>Barchasi</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <TableForOrders status={status} />
            {pagination && <PaginationDemo productText={productText} pagination={pagination} pathname='/orders' />}
        </div>
    )
}

export default OrdersContainer