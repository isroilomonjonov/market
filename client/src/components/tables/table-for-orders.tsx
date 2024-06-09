'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import axiosInstance from "@/utils/axiosInstance"
import { OrderType } from "../../../interfaces/order-inrterface"
import TableRowForOrder from "./table-row-for-order"
import ChangeOrderStatus from "../orders/changeOrderStatus"
import { useSearchParams } from "next/navigation"

export function TableForOrders({ status }: { status: string }) {
    const [orders, setOrders] = useState<OrderType[]>([])
    const searchParams = useSearchParams();
    let page = searchParams.get('page') || 1;
    let size = searchParams.get('size') || 9;
    const formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    useEffect(() => {
        getOrders();
    }, [page, size, status])
    const getOrders = async () => {
        try {
            const res = await axiosInstance({
                url: `/orders${page ? `?page=${page}&size=${size}` : ''}${page && status.length != 0 && status !== "all" ? "&status=" + status : ""}`,
                method: "GET"
            });
            setOrders(res.data.data.allOrders.content);

        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <Table>
            <TableCaption>{`Barcha buyurtmalar ro'yhati`}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Buyurtmachi</TableHead>
                    <TableHead>Telefon raqami</TableHead>
                    <TableHead>Narxi</TableHead>
                    <TableHead>{`Mahsulotlar`}</TableHead>
                    <TableHead>{`Status o'zgartirish`}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow className={`${order.status === "completed" && "bg-green-800"} ${order.status === "canceled" && "bg-red-800"}`} key={order.id}>
                        <TableCell>{order.status === "pending" && "Yangi"} {order.status === "completed" && "Tugatildi"} {order.status === "canceled" && "Bekor qilindi"}</TableCell>
                        <TableCell className="font-medium">{order.name}</TableCell>
                        <TableCell>{order.phoneNumber}</TableCell>
                        <TableCell>{formatter.format(Number(order.totalPrice))}</TableCell>
                        <TableCell>
                            <TableRowForOrder order={order} />
                        </TableCell>
                        <TableCell>
                            <ChangeOrderStatus order={order} getAll={() => getOrders()} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    )
}
