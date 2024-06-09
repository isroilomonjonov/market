import OrderPageContainer from "@/components/orders/order-container"
import { useTranslations } from "next-intl"


const Orders = () => {
    const tPagination = useTranslations('Pagination')
    const productText = {
        Next: tPagination('Next'),
        Previous: tPagination('Previous'),
    }
    return (
        <OrderPageContainer productText={productText} />
    )
}

export default Orders