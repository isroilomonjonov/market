'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import axiosInstance from "@/utils/axiosInstance"
import { useRouter } from "@/navigation"
import { OrderType } from "../../../interfaces/order-inrterface"
import { OrderItemType } from "../../../interfaces/order-item-interface"

export function TableForOrderItem({ order }: { order: OrderType }) {
    const [orderItems, setOrderItems] = useState<OrderItemType[]>([])
    useEffect(() => {
        getOrderItemsByOrderId();
    }, [])
    const getOrderItemsByOrderId = async () => {
        try {
            const res = await axiosInstance({
                url: `/orderitem/${order.id}`,
                method: "GET"
            });
            setOrderItems(res.data.data.allOrderItems.rows);
        } catch (error: any) {
            console.log(error);
        }
    }
    const formatter = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return (
        <Table>
            <TableCaption>{`Barcha mahsulotlar ro'yhati`}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nomi</TableHead>
                    <TableHead>Narxi</TableHead>
                    <TableHead>Soni</TableHead>
                    <TableHead>Umumiy narxi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderItems.map((orderItem: OrderItemType) => (
                    <TableRow key={order.id}>
                        <TableCell>{orderItem.product.title}</TableCell>
                        <TableCell>{orderItem.product.discount ? formatter.format(Number(orderItem.product.discount)) : formatter.format(Number(orderItem.product.price))}</TableCell>
                        <TableCell>{orderItem.quantity}</TableCell>
                        <TableCell>{formatter.format(Number(orderItem.subtotal))}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
