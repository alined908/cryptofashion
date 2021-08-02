import { useCallback, useEffect, useState } from 'react';
import StyledLayout from '../navigation/Layout';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {apiKey} from '../../constants/shopify';
import { getProductQuery} from '../../api/shopify';
import {IProduct} from '../../types/product';
import styled from 'styled-components';
import Button from '../shared/buttons/Button';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import { addProduct } from '../../actions/product';
// @ts-ignore
import ReactImageZoom from 'react-image-zoom';

interface ProductPageParams {
    productId : string
}

const StyledProduct = styled.div `
    display: flex;
`

const ProductTitle = styled.div`
    font-weight: bold;
    font-size: 3rem;
`

const ProductDescription = styled.div`
    margin-top: 2rem;
`

const ProductInformation = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
`

const ProductWrapper = styled.div`
    display: flex;
    padding: 2rem 0;
`

const ProductPage = ({provider, loadWeb3Modal, logoutOfWeb3Modal} : any) => {
    const web3Props = {provider, loadWeb3Modal, logoutOfWeb3Modal}
    const [product, setProduct] = useState<IProduct | null>();
    const dispatch : Dispatch<any> = useDispatch();
    let { productId } : ProductPageParams = useParams();

    const getProduct = useCallback(async () => {
        try {
            const response = await axios({
                url: 'https://nonfungibledesigns.myshopify.com/api/2021-07/graphql.json',
                method: "POST",
                data: getProductQuery(productId),
                headers: {
                    'Content-Type': 'application/graphql',
                    'X-Shopify-Storefront-Access-Token': apiKey 
                }
            })

            console.log(response.data);
            const node = response.data.data.node;
            const imageNode = node.images.edges[0].node;
            let product : IProduct = {id: node.id, title: node.title, description: node.description, image: imageNode.transformedSrc}
            setProduct(product);
        } catch(e) {
            console.log(e)
        }
    }, [productId])

    useEffect(() => {
        getProduct()
    }, [getProduct])

    const handleAddProduct = useCallback(
        (product: IProduct) => dispatch(addProduct(product!)),
        [dispatch]
    )

    return (
        <StyledLayout {...web3Props}>
            <ProductWrapper>
                {product && 
                    <StyledProduct>  
                        <ReactImageZoom {...{zoomPosition: "original", width: 400, height: 400, zoomWidth: 400, img: product.image}} />
                        <ProductInformation>
                            <ProductTitle>{product.title}</ProductTitle>
                            <ProductDescription>{product.description}</ProductDescription>
                            <div>
                                <Button onClick={() => handleAddProduct(product)}>
                                    Add Cart
                                </Button>
                                <Button>
                                    Buy Now
                                </Button>
                            </div>
                        </ProductInformation>
                        
                    </StyledProduct>
                }
            </ProductWrapper>
        </StyledLayout>
    )
}

export default ProductPage