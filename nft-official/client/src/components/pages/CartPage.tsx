import {useCallback} from 'react';
import StyledLayout from '../navigation/Layout';
import { useSelector, shallowEqual } from 'react-redux';
import { IProduct } from '../../types/product';
import { StoreState } from '../../reducers';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import { addCart } from '../../actions/cart';
import {ICart} from '../../types/cart';
import Button from '../shared/buttons/Button';

const CartPage = ({provider, loadWeb3Modal, logoutOfWeb3Modal} : any) => {
    const web3Props = {provider, loadWeb3Modal, logoutOfWeb3Modal}
    const dispatch : Dispatch<any> = useDispatch();

    const products : IProduct[] = useSelector(
        (state: StoreState) => state.cart.products,
        shallowEqual
    )

    const cart : ICart = useSelector(
        (state: StoreState) => state.cart,
        shallowEqual
    )

    const handleCreateCart = useCallback(
        () => dispatch(addCart()),
        [dispatch]
    )

    return (
        <StyledLayout {...web3Props}>
            Hello. Cart
            {products.map((product: IProduct) => 
                <div>
                    {product.id}
                </div>
            )}
            {cart.id}
            {!cart && <Button onClick={handleCreateCart}>
                Create Cart
            </Button>}
            
        </StyledLayout>
    )
}

export default CartPage