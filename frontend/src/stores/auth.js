import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {

    state: (() => ({
        username: '',
        email: '',
        isAuth: false,
    })),

    actions: {
        async fetchUser() {
            try {

                const response = await axios.post('http://localhost:4000/api/me', {}, {
                    withCredentials: true
                })

                this.username = response.data.username
                this.email = response.data.email

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