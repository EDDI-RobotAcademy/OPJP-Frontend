import { createStore } from 'vuex'

import AuthenticationModule from '../authentication/store/authenticationModule'
// import bookModule
import CartModule from '../cart/store/cartModule'
import orderModule from '../order/store/orderModule'
import accountModule from '../account/store/accountModule'


export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        AuthenticationModule,
        CartModule,
        orderModule,
        accountModule,
    }
})