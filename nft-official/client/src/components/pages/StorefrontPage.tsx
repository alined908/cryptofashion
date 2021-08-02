import {useState, useEffect, useCallback} from 'react';
import StyledLayout from '../navigation/Layout';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {IProduct} from '../../types/product';

const getProductsQuery = "{products(first: 20) {edges {node {id title description images(first: 1) {edges {node {altText transformedSrc(maxWidth: 400, maxHeight: 400)}}}}}}}"
const apiKey = '5b1a7740492581e31ebf1cb000749add'


const StyledProductCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1rem;
    margin: 1rem;
    max-width: 300px;
    transition: all .35s ease-in-out;
    cursor: pointer;

    &:hover {
        box-shadow: var(--shadow-m);
    }
`

const StyledProductImage = styled.img`
    max-width: 300px;
    height: auto;
`

const StyledProductTitle = styled.div`
    font-weight: bold;
    font-size: 2rem;
`
const StyledProductDescription = styled.div`
`

const Products = styled.div`
    display: flex;
`

const StorefrontPage = ({provider, loadWeb3Modal, logoutOfWeb3Modal} : any) => {

    const web3Props = {provider, loadWeb3Modal, logoutOfWeb3Modal}
    const [products, setProducts] = useState<IProduct[]>([]);

    const getProducts = useCallback(async () => {
        try {
            const response = await axios({
                url: 'https://nonfungibledesigns.myshopify.com/api/2021-07/graphql.json',
                method: "POST",
                data: getProductsQuery,
                headers: {
                    'Content-Type': 'application/graphql',
                    'X-Shopify-Storefront-Access-Token': apiKey 
                }
            })

            console.log(response.data);

            let products : IProduct[] = [];

            response.data.data.products.edges.forEach((edge : any) => {
                let productNode = edge.node;
                let imageNode = productNode.images.edges[0].node;
                let product : IProduct = {id: productNode.id, title: productNode.title, description: productNode.description, image: imageNode.transformedSrc}
                products.push(product);
            })

            setProducts(products);
        } catch(e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    return (
        <StyledLayout {...web3Props}>
            <Products>
                {products.map((product) => 
                    <Link key={product.id} to={`/store/products/${product.id}`}>
                        <StyledProductCard>
                            <StyledProductTitle>
                                {product.title}
                            </StyledProductTitle>
                            <StyledProductDescription>
                                {product.description}
                            </StyledProductDescription>
                            <StyledProductImage src={product.image}/>
                        </StyledProductCard>
                    </Link>
                )}
            </Products>
        </StyledLayout>
    )
}

export default StorefrontPage