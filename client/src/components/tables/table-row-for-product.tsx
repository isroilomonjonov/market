'use client'
import React, { useState } from 'react'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '../ui/button'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from '../ui/use-toast'
import { ProductType } from '../../../interfaces/product-interface'
import { useRouter } from '@/navigation'
const TableRowForProduct = ({ product, getAll }: { product: ProductType, getAll?: () => Promise<void> }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const router = useRouter();

    const deleteProduct = async () => {
        try {
            const res = await axiosInstance({
                url: `/products/${product.id}`,
                method: "DELETE"
            });
            toast({
                variant: "default",
                title: "Mahsulot muvaffaqiyatli o'chirildi",
            })
            getAll && getAll();
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <TableRow >
            <TableCell className="flex gap-3">
                <Button onClick={() => router.push({ pathname: `/products-for-admin/[id]`, params: { id: product.id } })} variant={'outline'}>Edit</Button>

                <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
                    <DialogTrigger onClick={() => setDeleteDialog(true)} className="bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90 h-10 px-4 py-2 rounded-lg">Delete</DialogTrigger>
                    <DialogContent>
                        <h1 className='text-3xl font-medium mb-4'>{`Rostanham "${product.title}" ni o'chirmoqchimisiz`}</h1>
                        <div className='flex justify-between items-center'>
                            <Button onClick={() => setDeleteDialog(false)}>{"Orqaga"}</Button>
                            <Button variant={'delete'} onClick={deleteProduct}>{"O'chirish"}</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}

export default TableRowForProduct