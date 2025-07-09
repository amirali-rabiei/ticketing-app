import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {

    state: (() => ({
        username: '',
        email: '',
        role: '',
        isAuth: false,
    })),

    actions: {
        async fetchUser() {
            try {

                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/me`, {}, {
                    withCredentials: true
                })

                this.username = response.data.username
                this.email = response.data.email
                this.email = response.data.role


                if (response.status === 200) {
                    localStorage.setItem('isAuth', '1')
                    this.isAuth = true
                }

            } catch (error) {
                console.log(error)
                localStorage.removeItem('isAuth')

            }
        }
    }
}) 