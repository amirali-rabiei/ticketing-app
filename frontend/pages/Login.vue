<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const HandleLogin = async () => {
    try {

        if (!email.value) {
            errorMessage.value = 'please fill the email'
        } else if (!password.value) {
            errorMessage.value = 'please fill the password'
        } else {

            errorMessage.value = ''

            const data = {
                email: email.value,
                password: password.value
            }


            await fetch('http://localhost:4000/LoginUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
                .then((response) => {
                    if (response.ok) {
                        router.push('/verify')
                    }

                    return response.json()
                })

                .then((data) => {
                    if (data.message == 'User already verified') {
                        router.push('/dashboard')
                    }
                    errorMessage.value = data.message
                })
        }

    } catch (error) {
        console.log(error)
    }
}

const handleForgetPassword = async () => {
    try {

        const response = await axios.post('http://localhost:4000/forgetPassword', { email: email.value })
        console.log(response.data)

    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div class="p-10 h-screen w-screen">
        <div class="bg-[#4C80F0] w-full h-full rounded-[10px] flex justify-center items-center  p-4">
            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input v-model="email"
                            class="shadow appearance-none border-[#4C80F0] border-1 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="email" placeholder="Email">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input v-model="password"
                            class="shadow appearance-none border-[#4C80F0] border-1 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************">
                    </div>
                    <div class="mb-4 text-red-700">
                        <span>{{ errorMessage }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <button @click.prevent="HandleLogin"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Sign In
                        </button>
                        <!-- <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#">
                            Forgot Password?
                        </a> -->
                        <!-- <RouterLink -->
                        <!-- class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" -->
                        <!-- to="/register">Forget Password</RouterLink> -->
                        <button @click.prevent="handleForgetPassword">Forget Password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
form {
    position: relative;
}

form::after {
    content: '';
    position: absolute;
    background: white;
    width: 30px;
    height: 30px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 5px;
    bottom: -15px;
    left: 0px;
}
</style>