export interface IProduct {
    id: string
    title: string
    description: string
    image: string
    variants?: IProductVariant[]
}

export interface IProductVariant {
    id: string
    image: string
    price: string
    quantityAvailable?: number
    availableForSale?: boolean
}