import { getItem, removeItem } from "@/helpers/persistance-storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  products: any[];
  totalPrice: number;
  totalProducts: number;
}

const initialState: ProductState = {
  products:  [],
  totalPrice:0,
  totalProducts: 0,
};

export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    setState:( state, action: PayloadAction<any>)=>{
      state = action.payload
      return state
    },
    addProductToState: (state, action: PayloadAction<any>) => {
      if (!action.payload.discount) {
        state.totalPrice = state.totalPrice + Number(action.payload.price);
      } else {
        state.totalPrice = state.totalPrice + Number(action.payload.discount);
      }
      state.totalProducts = state.totalProducts + 1;
      if (state.products.find((product) => product.id === action.payload.id)) {
        const existingItem = state.products.findIndex(
          (product: any) => product.id === action.payload.id
        );
        state.products[existingItem] = {
          ...action.payload,
          quantity: state.products[existingItem].quantity + 1,
        };
        localStorage.setItem("products", JSON.stringify(state.products));
        return;
      }
      state.products.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    deleteProductFromState: (state, action: PayloadAction<any>) => {
      state.totalProducts = state.totalProducts - 1;
      if (!action.payload.discount) {
        state.totalPrice = state.totalPrice - action.payload.price;
      } else {
        state.totalPrice = state.totalPrice - action.payload.discount;
      }
      if (state.products.find((product) => product.id === action.payload.id)) {
        const existingItem = state.products.findIndex(
          (product: any) => product.id === action.payload.id
        );
        if (state.products[existingItem].quantity > 1) {
          state.products[existingItem] = {
            ...action.payload,
            quantity: state.products[existingItem].quantity - 1,
          };
          localStorage.setItem("products", JSON.stringify(state.products));
          return;
        } else {
          state.products = state.products.filter(
            (product) => product.id !== action.payload.id
          );
        }
        localStorage.setItem("products", JSON.stringify(state.products));
        return;
      }
    },
    clearProducts: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalProducts = 0;
      removeItem("products");
    },
  },
});

export const { addProductToState, deleteProductFromState, clearProducts,setState } =
  productReducer.actions;
export const authReducer = productReducer.reducer;
