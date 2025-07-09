<script setup>
import axios, { Axios, AxiosError, isAxiosError } from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const newPassword = ref('')
const errorMessage = ref('')

const HandleChangePassword = async () => {

    const token = route.params.resetToken



    try {


        if (!newPassword.value) {
            errorMessage.value = 'please fill the code'
        } else {
            errorMessage.value = ''

            await axios.post(`${import.meta.env.VITE_BASE_URL}/reset/${token}`, { newPassword: newPassword.value }, {
                withCredentials: true
            })
                .then((response) => {
                    if (response) {
                        router.push('/dashboard')

                    }

                })
        }


    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.code)
        }
    }
}

</script>

<template>
    <div>
        here change password
        <form @submit.prevent="HandleChangePassword">
            <p>new password</p>
            <input v-model="newPassword" type="text">
            {{ errorMessage }}
            <button>Change</button>
        </form>
    </div>
</template>