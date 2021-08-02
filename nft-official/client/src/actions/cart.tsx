import { createCart, retrieveCart } from "../api/shopify";
import { Dispatch } from 'redux';
import { StoreState } from "../reducers";
import { ICart } from '../types/cart';
import * as types from '../store/actionTypes';
import localStorageService from "../helpers/browserStorage";

export interface AddCart {
    type: typeof types.ADD_CART
    cart: ICart
}

export interface GetCart {
    type: typeof types.GET_CART
    cart: ICart
}

export const addCart = () => {
    return async function(dispatch : Dispatch<any>, getState: () => StoreState) {
        const state = getState();
        const cartID = state.cart.id;
        
        if (cartID !== null) {
            return;
        }

        try {
            const response = await createCart();
            console.log(response.data);
            const id = response.data.data.cartCreate.cart.id;
            localStorageService.setItem('cart', id);
            const addCartAction : AddCart = {
                type: types.ADD_CART,
                cart: id
            } 
            dispatch(addCartAction)
            
        } catch (e) {
            console.log(e);
        }
    }
}

export const getCart = () => {
    return async function(dispatch: Dispatch<any>, getState: () => StoreState){
        const state = getState();
        const cartID = state.cart.id;

        if (cartID === null) {
            return;
        }

        try {
            console.log('Retrieving Cart API Called');
            const response = await retrieveCart(cartID);
            console.log(response.data);
        } catch(e) {
            console.log(e);
        }
    }
}