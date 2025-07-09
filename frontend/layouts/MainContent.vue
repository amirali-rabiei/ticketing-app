<script setup>
import axios from 'axios'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'



const tickets = ref('')
let startIndex = ref(0)

onMounted(async () => {
    try {

        const response = await axios.post(`https://ticketing-app-pied.vercel.app/fetchPopularTickets`)
        tickets.value = response.data
        console.log(response.data)



    } catch (error) {
        console.log(error)
    }


})

const visibleProduct = computed(() => {
    return tickets.value.slice(startIndex.value, startIndex.value + 3)
})

function nextSlideBtn() {
    
    if (startIndex.value < tickets.value.length) {
        startIndex.value += 3
    }
}

function prevSlideBtn() {
    if (startIndex.value - 2 >= 0) {
        startIndex.value = 0
    }
}


</script>

<template>
    <div class="mt-[100px] ">
        <h2 class="text-2xl font-semibold text-gray-800 text-center">Popular Events</h2>
        <div class="bg-[#F4F7FE] shadow-md w-full p-1 mt-4 flex gap-x-4 justify-center relative">

            <div class="bg-white shadow-xl relative top-6 p-2 rounded-md" v-for="ticket in visibleProduct"
                :key="ticket.id">
                <div class="bg-white shadow-xl rounded-xl">
                    <img class="w-full h-45  object-cover" src="../src/assets/f.jpeg" alt="image">
                    <div class="p-2 space-y-0.5">
                        <p class="text-1xl font-semibold text-gray-800">{{ ticket.title }}</p>
                        <p class="text-sm text-gray-600">{{ ticket.description }}</p>
                        <p class="text-sm text-gray-600">Date: {{ new Intl.DateTimeFormat('en-GB', {
                            dateStyle:
                                'full', timeStyle: 'short'
                        }).format(new Date(ticket.date)) }}</p>
                        <p class="text-sm text-gray-600">Price: {{ ticket.price }}$</p>
                        <button class="text-sm bg-blue-700 text-white w-full py-[3px] rounded-md mt-2">
                            <a :href="`/purcahseTicket/${ticket.id}`">Buy</a>
                        </button>
                    </div>
                </div>
            </div>

            <button class="absolute left-[10%] top-[50%] translate-y-[50%]" @click="prevSlideBtn"
                :disabled="startIndex <= 0">
                <ArrowLeft />
            </button>

            <button class="absolute right-[10%] top-[50%] translate-y-[50%]" @click="nextSlideBtn"
                :disabled="startIndex >= visibleProduct.length">
                <ArrowRight />
            </button>


        </div>
    </div>
</template>