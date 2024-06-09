'use client'
import React, { useEffect, useState } from 'react'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { OrderType } from '../../../interfaces/order-inrterface'
import { TableForOrderItem } from './table-for-order-item'
import ChangeOrderStatus from '../orders/changeOrderStatus'
const TableRowForOrder = ({ order }: { order: OrderType }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <TableRow >
            <TableCell className="flex gap-3">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger onClick={() => setDialogOpen(true)} className="bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 rounded-lg">Mahsulotlar</DialogTrigger>
                    <DialogContent>
                        <TableForOrderItem order={order} />
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}

export default TableRowForOrder