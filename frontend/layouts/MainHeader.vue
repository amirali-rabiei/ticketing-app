<script setup>
import {  DoorClosed, LayoutDashboard, Menu, RemoveFormatting, SquareX, X } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref, useTemplateRef } from 'vue';
import MainHero from './MainHero.vue';


const user = useAuthStore()

onMounted(async () => {
    await user.fetchUser()
})


const showMenu = ref(false)

const ToggleMenu = () => {
    showMenu.value = !showMenu.value
}


</script>
<template>
    <div class="bg-[#F4F7FE] c">
        <header>
            <nav class="flex justify-around py-10 md:py-[60px]">
                <div>
                    <p class="text-[#2877EE]">AllTix</p>
                </div>
                <div class="hidden md:block">
                    <div class="flex gap-x-10">
                        <p class="text-[#1F2D3D] font-extrabold">Home</p>
                        <p class="text-[#1F2D3D] font-extrabold">Contacts</p>
                        <p class="text-[#1F2D3D] font-extrabold">About</p>
                        <p class="text-[#1F2D3D] font-extrabold">Explore</p>
                    </div>
                </div>
                
                <div class="md:hidden">
                    <Menu v-if="!showMenu" @click="ToggleMenu" />
                    <X v-if="showMenu" @click="ToggleMenu" />
                    <div v-if="showMenu" class="bg-white w-full z-10 absolute left-0 mt-2 p-4 ">
                        <div class="flex flex-col gap-y-2 w-">
                            <p class="text-white p-1 rounded-md bg-[#2877EE] font-extrabold">Home</p>
                            <p class="text-white p-1 rounded-md bg-[#2877EE] font-extrabold">Contacts</p>
                            <p class="text-white p-1 rounded-md bg-[#2877EE] font-extrabold">About</p>
                            <p class="text-white p-1 rounded-md bg-[#2877EE] font-extrabold">Explore</p>
                            <div class="bg-[#2877EE] px-4.5 py-1 rounded-md font-extrabold text-white">
                                <div v-if="user.isAuth" class="flex gap-x-2 items-center">
                                    <LayoutDashboard size="20" />

                                    <a href="/dashboard">Dashboard</a>
                                </div>
                                <a v-else href="/register">Register | Login </a>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-[#2877EE] px-4.5 py-1 rounded-md text-white hidden md:block">

                    <div v-if="user.isAuth" class="flex gap-x-2 items-center">
                        <LayoutDashboard size="20" />

                        <a href="/dashboard">Dashboard</a>
                    </div>
                    <a v-else href="/register">Register | Login </a>

                </div>
            </nav>
        </header>
        <MainHero />
    </div>
</template>


<style scoped>
.c {
    border-bottom-left-radius: 60%;
    border-bottom-right-radius: 1%;
}
</style>