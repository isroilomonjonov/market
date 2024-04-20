import React from "react";
import { setAuthState } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
const AuthUpdater = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth.products);
    console.log(authState);

    return (
        <div>
            <button onClick={() => dispatch(setAuthState([{ a: 1 }]))}>Log in</button>
            <button onClick={() => dispatch(setAuthState([{ a: 2 }]))}>Log out</button>
        </div>
    );
};
export default AuthUpdater;