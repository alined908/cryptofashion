import {IProduct} from '../types/product';

export interface IMerchandise {
    id: string
}

export interface ICartLine {
    id: string
    merchandise: IMerchandise
    quantity: number
}

export interface ICart {
    id: string | null
    products: IProduct[]
    lines: ICartLine[]
    availableProducts? : IProduct[],
    total: number
}