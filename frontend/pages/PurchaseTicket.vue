<script setup>
import axios from 'axios';
import { onBeforeMount, ref, useTemplateRef } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute()
const ticketId = router.params.id

const ticket = ref([])
const quantity = ref('')
const errorMessage = ref('')

onBeforeMount(async () => {

    try {

        const response = await axios.post(`http://localhost:4000/fetchTicketById/${ticketId}`)
        ticket.value.push(response.data)



    } catch (error) {
        errorMessage.value = error.response.data.message
    }
})

const handlePurchase = async () => {
    try {

        const response = await axios.post(`http://localhost:4000/purchase/${ticketId}`, { quantity: quantity.value }, {
            withCredentials: true
        })

        console.log(response.data)

    } catch (error) {
        console.log(error)
    }
}



</script>

<template>
    <div class="bg-[#F4F7FE] w-screen h-screen flex justify-center p-5">
        <div v-if="errorMessage"><span>{{ errorMessage }}</span></div>
        <div v-else class="bg-white border-1 border-[#B0BED9] text-[#1F2D3D] w-[25rem] p-3"
            v-for="ticketDetail of ticket" :key="ticketDetail.id">
            <p class="mb-2 text-orange-500">Title: <span class="text-[#1F2D3D]">{{ ticketDetail.title }}</span></p>
            <p class="mb-2 text-orange-500">Date: <span class="text-[#1F2D3D]">{{ new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'full', timeStyle: 'short'
            }).format(new Date(ticketDetail.date)) }}</span></p>
            <p class="mb-2 text-orange-500">Location: <span class="text-[#1F2D3D]">{{ ticketDetail.location }}</span>
            </p>
            <p class="mb-2 text-orange-500">Category: <span class="text-[#1F2D3D]">{{
                ticketDetail.category.toLowerCase() }}</span>
            </p>

            <p class="mb-2 text-orange-500">Capacity: <span class="text-[#1F2D3D]">{{ ticketDetail.capacity }}</span>
            </p>
            <p class="mb-2 text-orange-500">Price: <span class="text-[#1F2D3D]" ref="pr">{{ ticketDetail.price }}</span>
            </p>
            <p class="mb-2 text-orange-500">Available: <span class="text-[#1F2D3D]">{{ ticketDetail.available }}</span>
            </p>
            <input type="text" v-model="quantity"
                class="shadow w-[50px] appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <button @click="handlePurchase" type="submit">Done</button>
        </div>
    </div>
</template>