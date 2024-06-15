export interface StasticsType {
  allOrders: number;
  allOrdersStatusCanceled: number;
  allOrdersStatusCompleted: number;
  totalPrice: number;
  getTime: {
    end: string;
    start: string;
  };
}
