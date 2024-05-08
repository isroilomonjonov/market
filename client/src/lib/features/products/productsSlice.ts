import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface ProductState {
  products: any[];
  totalPrice: number;
  totalProducts: number;
}

const initialState: ProductState = {
  products: [],
  totalPrice: 0,
  totalProducts: 0,
};

export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductToState: (state, action: PayloadAction<any>) => {
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalProducts = state.totalProducts + 1;
      if (state.products.find((product) => product.id === action.payload.id)) {
        const existingItem = state.products.findIndex(
          (product: any) => product.id === action.payload.id
        );
        state.products[existingItem] = {
          ...action.payload,
          quantity: state.products[existingItem].quantity + 1,
        };
        return;
      }
      state.products.push({ ...action.payload, quantity: 1 });
    },
    deleteProductFromState: (state, action: PayloadAction<any>) => {
      state.totalProducts = state.totalProducts - 1;
      state.totalPrice = state.totalPrice - action.payload.price;
      if (state.products.find((product) => product.id === action.payload.id)) {
        const existingItem = state.products.findIndex(
          (product: any) => product.id === action.payload.id
        );
        if (state.products[existingItem].quantity > 1) {
          state.products[existingItem] = {
            ...action.payload,
            quantity: state.products[existingItem].quantity - 1,
          };
          return;
        } else {
          state.products = state.products.filter(
            (product) => product.id !== action.payload.id
          );
        }
        return;
      }
    },
  },
});

export const { addProductToState, deleteProductFromState } =
  productReducer.actions;
export const authReducer = productReducer.reducer;
