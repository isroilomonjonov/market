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
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import axiosInstance from "@/utils/axiosInstance"
import { CategoryType } from "../../../interfaces/category-interface"
import TableRowForCategory from "./table-row-for-category"

export function TableForCategories({ dialog }: { dialog: boolean }) {
    useEffect(() => {
        getCategories()
    }, [dialog])
    const [categories, setCategories] = useState<CategoryType[]>([])
    const getCategories = async () => {
        try {
            const res = await axiosInstance({
                url: "/categories",
                method: "GET"
            });
            console.log("ishladi");

            setCategories(res.data.data.allCategory.rows);
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <Table>
            <TableCaption>{`Barcha kategoriyalar ro'yhati`}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nomi</TableHead>
                    <TableHead>{`O'zgartirish`}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRowForCategory key={category.id} category={category} getAll={getCategories} />
                ))}
            </TableBody>
        </Table>
    )
}
