'use client'
import React from 'react'
import ReduxProvider from '../storeProvider'
import RequireAuth from '@/components/requireAuth'
import { TableForCategories } from '@/components/tables/table-for-categories'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import CreateProduct from '@/components/products/createProduct'
import { Plus } from 'lucide-react'
import CreateCategory from '@/components/categories/createCategory'

const Categories = () => {
    const [dialogOpen, setDialogOpen] = React.useState(false)
    return (
        <ReduxProvider>
            <RequireAuth>
                <div className='container pt-12'>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-medium mb-4">Kategoriyalar</h1>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger onClick={() => setDialogOpen(true)} className='p-2 px-4 bg-green-700 rounded-sm text-white'><Plus className='w-4 h-4' /></DialogTrigger>
                            <DialogContent>
                                <CreateCategory closeDialog={() => setDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <TableForCategories dialog={dialogOpen}/>
                </div>
            </RequireAuth>
        </ReduxProvider>
    )
}

export default Categories