import actions, { CartActions } from "./actions"
// import mutations, { CartMutations } from "./mutations"
import state, { CartState } from "./states"

export interface CartModule {
    namespaced: true
    state: CartState
    actions: CartActions
    // mutations: CartMutations
}

const CartModule: CartModule = {
    namespaced: true,
    state,
    actions,
    // mutations,
}

export default CartModule