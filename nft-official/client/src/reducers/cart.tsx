import { CartAction } from '../actions';
import * as types from '../store/actionTypes';
import { ICart } from '../types/cart';

export const defaultCartState : ICart = {
    id: null,
    lines: [],
    products: [],
    total: 0
}

export default function cartReducer (state = defaultCartState, action : CartAction) {
    switch (action.type) {
        case types.ADD_CART:
            console.log(`ADDING CART: ${action.cart.id}`)
            return {...state,
                id: action.cart.id
            }
        case types.GET_CART:
            console.log(`RETREIVING CART`);
            return {
                ...state
            }
        case types.ADD_PRODUCT:
            console.log(`ADD_PRODUCT: ${action.product.id}`)
            return {...state, 
                products: [...state.products, action.product]
            };
        case types.REMOVE_PRODUCT:
            console.log(`REMOVE_PRODUCT: ${action.product.id}`)
            const filteredProducts = state.products.filter(product => product.id !== action.product.id)

            return {...state,
                products: [...filteredProducts]
            }
        default:
            return state;
    }
}