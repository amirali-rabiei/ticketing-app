<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';


const useAuth = useAuthStore()

const username = ref(useAuth.username)
const email = ref(useAuth.email)

</script>

<template>
    <div class="flex gap-x-50 items-center">

        <form class="p-15">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input v-model="username"
                    class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Email
                </label>
                <input v-model="email"
                    class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="text" placeholder="Email">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Password
                </label>
                <input v-model="Password"
                    class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="text" placeholder="Password">
            </div>

            <button @click.prevent="HandleSubmit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
                Change It
            </button>
        </form>
        <div class="flex gap-x-5 ">
            <div class="bg-[#F4F7FE] text-[#1F2D3D] p-3 w-fit rounded">
                <span>Registred On:</span>
            </div>
            <div class="bg-[#F4F7FE] text-[#1F2D3D] p-3 w-fit rounded">
                <span>Verified:</span>
            </div>
            <div class="bg-[#F4F7FE] text-[#1F2D3D] p-3 w-fit rounded">
                <span>Role:</span>
            </div>
        </div>
    </div>
</template>