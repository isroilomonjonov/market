'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationType } from "../../interfaces/pagination-interface"
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/navigation";

export function PaginationDemo({ productText, pagination, pathname }: { productText: any, pagination: PaginationType, pathname: "/products" | "/orders" }) {
    const { allPagesCount, isFirstPage, isLastPage, page } = pagination;
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageFront = parseInt(searchParams.get('page') || "1", 10);
    const sizeFront = parseInt(searchParams.get('size') || "9", 10);

    const [pagesCount, setPagesCount] = useState(6);
    const offset = pagesCount - 6;

    const sixPageChange = (num: number) => {
        if (num === 1) {
            setPagesCount(pagesCount + 6);
            router.push({ pathname: pathname, query: { page: +offset + 7, size: sizeFront } });
        } else {
            setPagesCount(pagesCount - 6);
            router.push({ pathname: pathname, query: { page: +offset, size: sizeFront } });
        }
    };

    const prevFn = () => {
        if (!isFirstPage) {
            if ((pageFront - 1) === offset) {
                setPagesCount(pagesCount - 6);
                router.push({ pathname: pathname, query: { page: pageFront - 1, size: sizeFront } });
            } else {
                router.push({ pathname: pathname, query: { page: pageFront - 1, size: sizeFront } });
            }
        }
    };

    const nextFn = () => {
        if (!isLastPage) {
            if (+page === pagesCount) {
                setPagesCount(pagesCount + 6);
                router.push({ pathname: pathname, query: { page: pageFront + 1, size: sizeFront } });
            } else {
                router.push({ pathname: pathname, query: { page: pageFront + 1, size: sizeFront } });
            }
        }
    };

    return (
        <Pagination className="container pt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious text={productText.Previous} href="#" isActive={!isFirstPage} onClick={prevFn} />
                </PaginationItem>
                {pagesCount > 7 && (
                    <PaginationItem onClick={() => sixPageChange(0)}>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {Array.from({ length: allPagesCount }).map((_, i) => {
                    const pageIndex = i + 1;
                    if (pageIndex > offset && pageIndex <= pagesCount) {
                        return (
                            <PaginationItem key={i}>
                                <Link href={{ pathname: pathname, query: { page: pageIndex, size: sizeFront } }}>
                                    <PaginationLink href="#" isActive={page === pageIndex}>{pageIndex}</PaginationLink>
                                </Link>
                            </PaginationItem>
                        );
                    }
                })}
                {allPagesCount > pagesCount && (
                    <PaginationItem onClick={() => sixPageChange(1)}>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext text={productText.Next} href="#" isActive={!isLastPage} onClick={nextFn} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}