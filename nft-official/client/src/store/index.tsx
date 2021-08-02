import { createStore, applyMiddleware, compose, AnyAction } from "redux";
import { appReducer } from '../reducers';
import { getCart } from "../actions/cart";
import { defaultCartState } from "../reducers/cart";
import reduxThunk, { ThunkDispatch } from "redux-thunk";
import { StoreState } from "../reducers";
import localStorageService from '../helpers/browserStorage';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(reduxThunk);
const persistedState = {cart: {...defaultCartState, id: localStorageService.getItem('cart') as string | null}}

export const store = createStore(appReducer, persistedState, composeEnhancers(middleware));

(store.dispatch as ThunkDispatch<StoreState, unknown, AnyAction>)(getCart());