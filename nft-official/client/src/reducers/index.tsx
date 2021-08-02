import { combineReducers } from "redux";
import { ICart } from "../types/cart";
import cartReducer from "./cart";

export type StoreState = {
    cart : ICart
};

export const appReducer = combineReducers({
    cart: cartReducer
});