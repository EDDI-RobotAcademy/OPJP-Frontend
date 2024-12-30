export interface CartState {
    cartItemList: CartItem[]
    cartItem: CartItem | null
}

export interface CartItem {
    bookId: number,
    bookName: string,
    bookPrice: number,
    quantity: number,
}

const state: CartState = {
    cartItemList: [],
    cartItem: null
}

export default state