import CartContainer from "@/components/cart/cart"
import { useTranslations } from 'next-intl';

const Cart = () => {
    const tCart = useTranslations('Cart');
    const cartText = {
        title: tCart('title'),
        order: tCart('order'),
        products: tCart('products'),
        name: tCart('name'),
        phoneNumber: tCart('phoneNumber'),
        orderCompletedSuccesufly: tCart('orderCompletedSuccesufly'),
    }
    return (
        <CartContainer text={cartText} />
    )
}

export default Cart