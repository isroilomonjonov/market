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
import { ProductType } from "../../../interfaces/product-interface"
import axiosInstance from "@/utils/axiosInstance"
import { useRouter } from "@/navigation"
import TableRowForProduct from "./table-row-for-product"

export function TableForProducts() {
    const router = useRouter();
    type ProductPath = `/products-for-admin/${number}`;
    useEffect(() => {
        getProducts()
    }, [])
    const [products, setProducts] = useState<ProductType[]>([])
    const getProducts = async () => {
        try {
            const res = await axiosInstance({
                url: "/products",
                method: "GET"
            });
            console.log(res.data.data.allProduct.content);

            setProducts(res.data.data.allProduct.content);
        } catch (error: any) {
            console.log(error);
        }
    }
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
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.category.title}</TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className="flex gap-3">
                            {/* <Button onClick={() => router.push({ pathname: `/products-for-admin/[id]`, params: { id: product.id } })} variant={'outline'}>Edit</Button>
                            <Button variant={'delete'}>Delete</Button> */}
                            <TableRowForProduct product={product} getAll={getProducts} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
