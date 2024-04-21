import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
  products: any[];
  totalPrice: number;
  totalProducts: number;
}

const initialState: IAuthState = {
  products: [],
  totalPrice: 0,
  totalProducts: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
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

export const { setAuthState, addProductToState, deleteProductFromState } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
