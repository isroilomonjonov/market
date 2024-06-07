import CardContainer from '@/components/card-container';
import { useTranslations } from 'next-intl';

export default function Products() {
    const tNavbar = useTranslations('Navbar')
    const tProducts = useTranslations('Products')
    const tPagination = useTranslations('Pagination')
    const productText = {
        Products: tNavbar('Products'),
        Search: tProducts('Search'),
        Categories: tProducts('Categories'),
        All: tProducts('All'),
        NoProducts: tProducts('NoProducts'),
        Next: tPagination('Next'),
        Previous: tPagination('Previous'),
    }
    return (
        <div className="">
            <CardContainer productText={productText} />
        </div>
    );
}