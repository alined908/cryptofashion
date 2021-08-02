import * as types from '../store/actionTypes';
import { IProduct } from '../types/product'
import { Dispatch } from 'redux';
import { StoreState } from "../reducers";
import { addProductToCart } from '../api/shopify';

export interface AddProduct {
    type: typeof types.ADD_PRODUCT
    product: IProduct
}

export interface RemoveProduct {
    type: typeof types.REMOVE_PRODUCT
    product: IProduct
}

export const addProduct = (product: IProduct) => {
    return async function(dispatch: Dispatch<any>, getState: () => StoreState){
        const state = getState();
        const cartID = state.cart.id;

        try {
            console.log('Adding Product to Cart Called');
            const response = await addProductToCart(cartID!, product.id);
            console.log(response.data);
            const addProductAction = {
                type: types.ADD_PRODUCT,
                product: product
            }
            dispatch(addProductAction)
        } catch(e) {
            console.log(e);
        }
    }
}

export const removeProduct = (product: IProduct) : RemoveProduct => {
    return {
        type: types.REMOVE_PRODUCT,
        product: product
    }
}

