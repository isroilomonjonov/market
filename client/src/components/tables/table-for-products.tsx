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
import { ProductsData } from "@/data/products"
import { Button } from "../ui/button"

export function TableForProducts() {
    return (
        <Table>
            <TableCaption>{`Barcha mahsulotlar ro'yhati`}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Kategoriyasi</TableHead>
                    <TableHead>Nomi</TableHead>
                    <TableHead>Narxi</TableHead>
                    <TableHead>{`O'zgartirish`}</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {ProductsData.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.category}</TableCell>
                        <TableCell>{invoice.title}</TableCell>
                        <TableCell>{invoice.price}</TableCell>
                        <TableCell className="flex gap-3">
                            <Button variant={'outline'}>Edit</Button>
                            <Button variant={'delete'}>Delete</Button>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
