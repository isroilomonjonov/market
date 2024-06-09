import { ProductType } from "./product-interface";

export interface OrderItemType {
  id: number;
  subtotal: string;
  quantity: number;
  productId: number;
  orderId: string;
  product: ProductType;
}
