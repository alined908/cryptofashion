import axios from 'axios';
import { apiKey } from '../constants/shopify'

const cartCreateQuery = `mutation createCart($cartInput: CartInput) {cartCreate(input: $cartInput) {cart {id createdAt updatedAt}}}`
const cartCreateInput = {cartInput: {}}

export const createCart = () => axios({
    url: 'https://nonfungibledesigns.myshopify.com/api/unstable/graphql.json',
    method: "POST",
    data: {
        query: cartCreateQuery,
        variables: cartCreateInput
    },
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': apiKey 
    }
})

const cartRetrieveQuery = (cartID : string) => `
{cart(id:"${cartID}") {
    id
    createdAt
    updatedAt
    lines(first:10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              quantityAvailable
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    attributes {
      key
      value
    }
    estimatedCost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
    }
  }
}
`;

export const retrieveCart = (cartID: string) : Promise<any> => {
    return axios({
        url: 'https://nonfungibledesigns.myshopify.com/api/unstable/graphql.json',
        method: "POST",
        data: {
            query: cartRetrieveQuery(cartID)
        },
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': apiKey 
        }
    })
}

export const getProductsQuery = `{products(first: 20) {
    edges {
        node {
            id 
            title 
            description 
            variants(first: 10) {
                edges {
                  node {
                      id
                      availableForSale
                      price
                      quantityAvailable
                      image {
                        transformedSrc(maxWidth: 400, maxHeight: 400)
                      }
                   }
                }
              }
            images(first: 1) {
                edges {
                    node {
                        altText 
                        transformedSrc(maxWidth: 400, maxHeight: 400)
                    }
                }
            }
        }
    }
}}`

export const getProductQuery = (id: string) =>`{
    node(id: "${id}") 
    {id... on Product {
        title 
        description 
        variants(first: 10) {
            edges {
              node {
                  id
                  availableForSale
                  price
                  quantityAvailable
                  image {
                    transformedSrc(maxWidth: 400, maxHeight: 400)
                  }
               }
            }
          }
        images(first: 1) {
            edges {
                node {
                    id
                    originalSrc
                    transformedSrc
                }
            }
  }}}}`

export const addProductQuery = `
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first:10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

const addProductInput = (cartID: string, productID : string) =>  {
    return {
        cartId: cartID,
        lines: {
            id: productID,
            quantity: 1
        }
    }
}

export const addProductToCart = (cartID: string, productID : string) : Promise<any> => {
    return axios({
        url: 'https://nonfungibledesigns.myshopify.com/api/unstable/graphql.json',
        method: "POST",
        data: {
            query: addProductQuery,
            variables: addProductInput(cartID, productID)
        },
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': apiKey 
        }
    })
}
