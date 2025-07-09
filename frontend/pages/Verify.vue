<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter()

const code = ref('')
const errorMessage = ref('')

const HandleVerifyCode = async () => {
    try {

        if (!code) {
            errorMessage.value = 'please fill the code'
        } else {

            errorMessage.value = ''

            const data = {
                code: code.value
            }

            fetch('http://localhost:4000/VerificationCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
                .then((response) => {
                    if (response.ok) {
                        router.push('/dashboard')
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
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            code Sended! please check email
                        </label>
                        <input v-model="code"
                            class="shadow appearance-none border-[#4C80F0] border-1 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="code" type="code" placeholder="Code">
                    </div>
                    <div class="mb-6 text-red-700">
                        <span>{{ errorMessage }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <button @click.prevent="HandleVerifyCode"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Send
                        </button>
                        <!-- <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#">
                            Forgot Password?
                        </a> -->
                        <RouterLink
                            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            to="/register">Forget Password</RouterLink>
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