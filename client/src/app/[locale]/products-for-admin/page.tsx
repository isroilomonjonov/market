'use client'
import RequireAuth from '@/components/requireAuth'
import React from 'react'
import ReduxProvider from '../storeProvider'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import CreateProduct from '@/components/products/createProduct'
import { Link } from '@/navigation'
import { TableForProducts } from '@/components/tables/table-for-products'

const ProductsForAdmin = () => {
    return (
        <ReduxProvider>
            <RequireAuth>
                <div className='container pt-12'>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-medium ">Mahsulotlar</h1>
                        {/* <Dialog>
                            <DialogTrigger className='p-2 px-4 bg-green-700 rounded-sm text-white'><Plus className='w-4 h-4' /></DialogTrigger>
                            <DialogContent>
                                <CreateProduct />
                            </DialogContent>
                        </Dialog> */}
                        <Button variant='green'><Link href={'/products-for-admin/new'}><Plus className='w-4 h-4' /></Link></Button>
                    </div>
                    <TableForProducts />
                </div>
            </RequireAuth>
        </ReduxProvider>
    )
}

export default ProductsForAdmin