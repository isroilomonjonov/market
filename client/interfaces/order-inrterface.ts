import { ProductType } from "./product-interface";

export interface OrderType {
  id: number;
  totalPrice: string;
  status: string;
  name: string;
  phoneNumber: string;
}
