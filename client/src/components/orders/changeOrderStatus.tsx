import axiosInstance from '@/utils/axiosInstance';
import React, { useState } from 'react'
import { OrderType } from '../../../interfaces/order-inrterface';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const ChangeOrderStatus = ({ order, getAll }: { order: OrderType, getAll?: () => Promise<void> }) => {
    const [dialogOpen, setDialogOpen] = useState<boolean | string>(false);
    const { toast } = useToast()
    const changeOrderStatus = async (status: string) => {
        try {
            const res = await axiosInstance({
                url: `/orders/${order.id}`,
                data: { status },
                method: "PATCH"
            });
            console.log(res);

            toast({ title: res.data.message })
            getAll && getAll();
            setDialogOpen(false)
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <div className='flex gap-3'>
            <Button variant={'secondary'} disabled={order.status !== "pending"} onClick={() => setDialogOpen("completed")}>Yakunlash</Button>
            <Button variant={'default'} disabled={order.status !== "pending"} onClick={() => setDialogOpen("canceled")}>Bekor qilish</Button>
            <Dialog open={Boolean(dialogOpen)} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <h1 className='text-3xl font-medium mb-4'>{`Buyurtmani "${dialogOpen === "canceled" ? "bekor qilindi" : "yakunlandi"}" statusiga o'zgartirmoqchimisiz!`}</h1>
                    <div className='flex justify-between items-center'>
                        <Button variant="destructive" onClick={() => setDialogOpen(false)}>{"Orqaga"}</Button>
                        <Button variant={'green'} onClick={() => changeOrderStatus(dialogOpen as string)}>{"O'zgartirish"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ChangeOrderStatus