'use client'
import React, { useState } from 'react'
import { CategoryType } from '../../../interfaces/category-interface'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import CreateCategory from "../categories/createCategory"
import { Button } from '../ui/button'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from '../ui/use-toast'
const TableRowForCategory = ({ category, getAll }: { category: CategoryType, getAll?: () => Promise<void> }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)

    const deleteCategory = async () => {
        try {
            const res = await axiosInstance({
                url: `/categories/${category.id}`,
                method: "DELETE"
            });
            toast({
                variant: "default",
                title: "Kategoriya muvaffaqiyatli o'chirildi",
            })
            getAll && getAll();
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <TableRow >
            <TableCell className="font-medium">{category.title}</TableCell>
            <TableCell className="flex gap-3">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger onClick={() => setDialogOpen(true)} className="bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 rounded-lg">Edit</DialogTrigger>
                    <DialogContent>
                        <CreateCategory closeDialog={() => setDialogOpen(false)} id={category.id} getAll={getAll} />
                    </DialogContent>
                </Dialog>
                {/* <Button variant={'outline'}>Edit</Button> */}
                <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
                    <DialogTrigger onClick={() => setDeleteDialog(true)} className="bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90 h-10 px-4 py-2 rounded-lg">Delete</DialogTrigger>
                    <DialogContent>
                        <h1 className='text-3xl font-medium mb-4'>{`Rostanham "${category.title}" ni o'chirmoqchimisiz`}</h1>
                        <div className='flex justify-between items-center'>
                            <Button onClick={() => setDeleteDialog(false)}>{"Orqaga"}</Button>
                            <Button variant={'delete'} onClick={deleteCategory}>{"O'chirish"}</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}

export default TableRowForCategory