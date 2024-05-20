export interface ProductType {
  id: number;
  title: string;
  price: string;
  description: string;
  discount: string;
  category: {
    id: number;
    title: string;
  };
  image: string;
  attachment: {
    createdAt: string;
    id: number;
    isConnect: boolean;
    name: string;
    originalName: string;
    size: string;
    type: string;
    updatedAt: string;
  };
}
