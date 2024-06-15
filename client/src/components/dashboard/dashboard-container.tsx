'use client'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import axiosInstance from '@/utils/axiosInstance';
import { StasticsType } from '../../../interfaces/statistics-interface';
import CustomPieChart from './chart';

const DashboardContainer = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [statistics, setStatistics] = useState<StasticsType>()
    const [status, setStatus] = useState('today');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    useEffect(() => {
        getStatistics();
    }, [status])
    const getStatistics = async (start?: string, end?: string) => {
        try {
            const res = await axiosInstance({
                url: `/orders/statistics?${start && end ? `start=${start}&end=${end}` : status ? status : ""}`,
                method: "GET"
            });
            setStatistics(res.data.data);
        } catch (error: any) {
            console.log(error);
        }
    }
    const statusFn = (val: string) => {
        router.push({ pathname: `/dashboard`, query: { [val]: '' } });
        setStatus(val)
    }

    const fn = (time: string) => {
        const date = new Date(time);
        date.setHours(date.getHours() - 5);
        return date.toLocaleDateString('Uz-uz', {
            year: 'numeric',  // Full numeric year (e.g., 2024)
            month: 'numeric',    // Full month name (e.g., June)
            day: 'numeric',   // Numeric day of the month (e.g., 15)
            hour: 'numeric',  // Numeric hour (e.g., 21 for 24-hour format)
            minute: 'numeric', // Numeric minute (e.g., 45)
        })
    }
    return (
        <div className='container pt-12'>
            <div className='mb-5 flex items-end gap-3'>
                <div className='w-[50%]'>
                    <Select onValueChange={(val) => { statusFn(val) }} value={status}>
                        <SelectTrigger>
                            <SelectValue placeholder={"Oraliq"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'today'}>Bugungi</SelectItem>
                            <SelectItem value={'yesterday'}>Kechagi</SelectItem>
                            <SelectItem value={'week'}>Haftalik</SelectItem>
                            <SelectItem value={'month'}>Oylik</SelectItem>
                            <SelectItem value={'year'}>Yillik</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <p>Yoki</p>
                <div className='w-[50%] flex items-end gap-2'>
                    <div className='w-full'>
                        <Label htmlFor="startDate">Boshlang`ich vaqt</Label>
                        <Input onChange={(e) => setStart(e.target.value)} id="startDate" type="date" />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="endDate">Tugash vaqt</Label>
                        <Input onChange={(e) => setEnd(e.target.value)} id="endDate" type="date" />
                    </div>
                    <Button onClick={() => getStatistics(start, end)}>Qidirish</Button>
                </div>
            </div>
            {statistics && <div className='flex justify-between'><div className="flex flex-col gap-2 mb-4"><p>Boshlanish vaqti: {fn(statistics.getTime.start)}</p><p>Tugash vaqti: {fn(statistics.getTime.end)}</p></div><div>
                <p>Barcha buyurtmalar: <span className="text-2xl font-bold ">{statistics.allOrders}</span></p>
                <p>Tugallangan buyurtmalar: <span className="text-2xl font-bold ">{statistics.allOrdersStatusCompleted}</span></p>
                <p>Rad etilgan buyurtmalar: <span className="text-2xl font-bold ">{statistics.allOrdersStatusCanceled}</span></p>
            </div></div>}
            {statistics?.totalPrice && <h3 className='mb-4'>Tugallangan buyurtmalarning umumiy narxi: <span className="text-2xl font-bold ">{formatter.format(Number(statistics.totalPrice))}</span></h3>}
            {/* {statistics && } */}
            {statistics && <CustomPieChart statistics={statistics} />}
        </div>
    )
}

export default DashboardContainer