import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import HomeRoutes from '../home/router/HomeRoutes'
import AccountRoutes from '../account/router/AccountRoutes'
import authenticationRoutes from '../authentication/router/AuthenticationRoutes'
// import BookRoutes
import BookmarkRoutes from '../bookmark/router/BookmarkRoutes'
import CartRoutes from '../cart/router/CartRoutes'

import OrderRoutes from '../order/router/OrderRoutes'
import ReportRoutes from '../report/router/ReportRouters'

import D3PlotRoutes from '../d3plot/router/D3PlotRoutes'


const routes: Array<RouteRecordRaw> = [
    ...HomeRoutes,
    ...AccountRoutes,
    ...authenticationRoutes,
    ...BookmarkRoutes,
    ...CartRoutes,
    ...OrderRoutes,
    ...ReportRoutes,
    ...D3PlotRoutes,
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_DIR),
    routes
})
export default router