<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')


const HandleSubmit = async () => {
    try {

        if (!username.value) {
            errorMessage.value = 'please fill the username'
        }
        else if (!email.value) {
            errorMessage.value = 'please fill the email'
        }
        else if (!password.value) {
            errorMessage.value = 'please fill the password'
        } else {

            errorMessage.value = ''

            const data = {
                username: username.value,
                email: email.value,
                password: password.value,
            }

            await fetch(`${import.meta.env.VITE_BASE_URL}/RegisterUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.ok) {
                        router.push('/login')
                    }
                    return response.json()

                })
                .then((data) => {
                    errorMessage.value = data.message
                })

        }

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
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input v-model="username"
                            class="shadow appearance-none border-[#4C80F0] border-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Username">
                    </div>
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
                        <span> {{ errorMessage }}</span>
                    </div>

                    <div class="flex items-center justify-between">
                        <button @click.prevent="HandleSubmit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Sign Up
                        </button>
                        <!-- <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#">
                            Forgot Password?
                        </a> -->
                        <RouterLink
                            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            to="/login"> You have account?</RouterLink>
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