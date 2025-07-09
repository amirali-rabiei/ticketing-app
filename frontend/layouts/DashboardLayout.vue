<script setup>
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Home, LayoutDashboard, User, Ticket, HelpCircle, TicketPlusIcon, Settings, LogOut, Plus } from 'lucide-vue-next';

const router = useRouter()

const handleForgetPassword = async () => {
    try {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/forgetPassword`, {}, {
            withCredentials: true
        })
        console.log(response.data)

    } catch (error) {
        console.log(error)
    }
}

const handleLogout = async () => {
    try {

        await axios.post(`${import.meta.env.VITE_BASE_URL}/LogoutUser`, {}, {
            withCredentials: true
        })

            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    localStorage.removeItem('isAuth')
                    router.push('/')
                }
            })

    } catch (error) {
        console.log(error)
    }
}

const auth = useAuthStore()



</script>
<!-- <button @click="handleForgetPassword">Forget Password</button>
        <button @click="handleLogout">Logout</button> -->
<template>
    <div class="flex flex-col md:flex-row gap-10 p-4 h-screen w-screen bg-[#F4F7FE]">


        <div class="bg-[white] h-full border-1 rounded-[10px] p-2 border-[#B0BED9]">
            <div class="flex justify-between h-full flex-col">
                <div class="flex flex-col gap-y-3">
                    <div class="flex items-center gap-6 bg-[#F4F7FE] p-2 text-[#1F2D3D] rounded-[4px]">
                        <Home size="20" />
                        <RouterLink to="/">Home</RouterLink>
                    </div>

                    <div class="flex items-center gap-6 bg-[#F4F7FE] p-2 text-[#1F2D3D] rounded-[4px]">
                        <LayoutDashboard size="20" />
                        <RouterLink to="/dashboard">Dashboard</RouterLink>
                    </div>

                    <div class="flex items-center gap-6 bg-[#F4F7FE] p-2 text-[#1F2D3D] rounded-[4px]">
                        <Ticket size="20" />
                        <a href="">My Tickets</a>
                    </div>

                    <div class="flex items-center gap-6 bg-[#F4F7FE] p-2 text-[#1F2D3D] rounded-[4px]">
                        <HelpCircle size="20" />
                        <a href="">Support</a>
                    </div>

                    <div class="flex items-center gap-6 bg-[#F4F7FE] p-2 text-[#1F2D3D] rounded-[4px]">
                        <Plus size="20" />
                        <RouterLink to="/addTicket">Add Ticket</RouterLink>
                    </div>

                </div>

                <div class="flex items-center gap-6 bg-[#F4F7FE] p-2 text-[#1F2D3D] rounded-[4px]">
                    <User size="20" />
                    <div class="flex flex-col">
                        <div class="flex justify-between">
                            <span>{{ auth.username.charAt(0).toUpperCase() + auth.username.slice(1) }}</span>
                            <div class="flex items-center gap-x-3">
                                <RouterLink to="/profile">
                                    <Settings size="19" />
                                </RouterLink>
                                <button class="cursor-pointer" @click="handleLogout">
                                    <LogOut color="red" size="19" />
                                </button>
                            </div>
                        </div>
                        <span class="text-[12px]">{{ auth.email }}</span>
                    </div>
                </div>

            </div>
        </div>

        <div class="w-full">
            <div class="bg-white w-full h-full overflow-auto  border-1 shadow-xl rounded-[10px] p-2 border-[#B0BED9]">
                <RouterView></RouterView>
            </div>
        </div>



    </div>


</template>
