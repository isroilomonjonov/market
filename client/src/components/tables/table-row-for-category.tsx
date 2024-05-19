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
const TableRowForCategory = ({ category, getAll }: { category: CategoryType, getAll?: () => Promise<void> }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <TableRow >
            <TableCell className="font-medium">{category.title}</TableCell>
            <TableCell className="flex gap-3">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger onClick={() => setDialogOpen(true)} >Edit</DialogTrigger>
                    <DialogContent>
                        <CreateCategory closeDialog={() => setDialogOpen(false)} id={category.id} getAll={getAll} />
                    </DialogContent>
                </Dialog>
                {/* <Button variant={'outline'}>Edit</Button> */}
                <Button variant={'delete'}>Delete</Button>
            </TableCell>
        </TableRow>
    )
}

export default TableRowForCategory