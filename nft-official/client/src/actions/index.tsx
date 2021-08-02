import { AddProduct, RemoveProduct } from "./product"
import { AddCart, GetCart } from "./cart"

export type CartAction = AddProduct | RemoveProduct | AddCart | GetCart