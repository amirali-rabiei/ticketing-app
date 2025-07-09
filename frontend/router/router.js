import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/Index.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Verify from "../pages/Verify.vue";
import { useAuthStore } from "@/stores/auth";
import ResetPassword from "../pages/ResetPassword.vue";
import Profile from "../pages/Profile.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import AddTicket from "../pages/AddTicket.vue";
import PurchaseTicket from "../pages/PurchaseTicket.vue";

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: "/register",
        name: 'register',
        component: Register
    },
    {
        path: "/login",
        name: 'login',
        component: Login
    },
    {
        path: '/verify',
        name: 'verify',
        component: Verify,
    },
    {
        path: '/dashboard',
        name: 'dashboardLayout',
        component: DashboardLayout,
        meta: { requiredAuth: true },
        children: [
            {
                path: '/profile',
                name: 'profile',
                component: Profile
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: '/addTicket',
                name: 'addTicket',
                component: AddTicket,
                meta: { requiredAuth: true }
            }
        ],
    },
    {
        path: '/reset/:resetToken',
        name: 'reset',
        component: ResetPassword,
        meta: { requiredAuth: true }
    },
    {
        path: '/purcahseTicket/:id',
        name: 'purchaseTicker',
        component: PurchaseTicket,
        meta: { requiredAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach(async (to, from, next) => {

    const useAuth = useAuthStore()

    if (to.matched.some((record) => record.meta.requiredAuth)) {
        await useAuth.fetchUser()

        if (to.meta.requiredAuth && !localStorage.getItem('isAuth')) {

            return next({ path: '/register' })
        }

    }
    if (to.path == '/register' && localStorage.getItem('isAuth')) {
        return next({ path: '/dashboard' })

    }
    next()

})


export default router