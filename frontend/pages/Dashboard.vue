<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

const lastestTickets = ref('')
const errorMessage = ref('')
const result = ref('')


const series = ref([])

const chartOptions = ref({
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: true
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'Product Trends by Month',
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
        }
    },
    xaxis: {
        categories: [],
    }
})


onBeforeMount(async () => {

    try {

        const response = await axios.post('http://localhost:4000/fetchTicket/lastest')
        lastestTickets.value = response.data

        const solidTicketByMonth = await axios.get('http://localhost:4000/solidTicketsByMonth')
        result.value = solidTicketByMonth.data

        const labels = result.value.map(item =>
            new Date(item.month).getMonth() + 1
        )
        const totals = result.value.map(item => item.total)

        series.value = [{
            name: 'تعداد فروش',
            data: totals
        }]

        chartOptions.value.xaxis.categories = labels



    } catch (error) {
        errorMessage.value = 'error fetching data'
    }
})

</script>

<template>
    <div class="h-full flex flex-col justify-between">
        <apexchart width="100%" height="350" type="line" :options="chartOptions" :series="series"></apexchart>


        <div>
            <h1>Lastest Tickets</h1>
            <div class="bg-indigo-100 rounded p-2 h-[200px] text-[#1F2D3D] overflow-auto">
                <div v-if="errorMessage" class="flex justify-center items-center h-full">
                    <span class="text-red-600">{{ errorMessage }}</span>
                </div>
                <table v-if="lastestTickets.length" class="mt-3 table-auto border-collapse min-w-full">
                    <thead class="bg-indigo-200 text-left sticky top-[-8px]">
                        <tr>
                            <th class="p-1">Title</th>
                            <th class="p-1">Description</th>
                            <th class="p-1">Date</th>
                            <th class="p-1">Location</th>
                            <th class="p-1">Capacity</th>
                            <th class="p-1">Price</th>
                            <th class="p-1">Available</th>
                            <th class="p-1">Category</th>
                            <th class="p-1">Reserve</th>
                        </tr>
                    </thead>
                    <tbody class="bg-indigo-100">
                        <tr class="border-b-[1px] border-[#F4F7FE]" v-for="ticket in lastestTickets" :key="ticket">
                            <td class="p-1">{{ ticket.title }}</td>
                            <td class="p-1">{{ ticket.description }}</td>
                            <td class="p-1">{{ new Intl.DateTimeFormat('en-GB', {
                                dateStyle: 'full', timeStyle: 'short'
                            }).format(new Date(ticket.date)) }}</td>
                            <td class="p-1">{{ ticket.location }}</td>
                            <td class="p-1">{{ ticket.capacity }}</td>
                            <td class="p-1">{{ ticket.price }}</td>
                            <td class="p-1">{{ ticket.available }}</td>
                            <td class="p-1">{{ ticket.category.toLowerCase() }}</td>
                            <td class="p-1 text-center">
                                <RouterLink :to="`/purcahseTicket/${ticket.id}`">Buy</RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="flex justify-center items-center h-full">
                    <span>No new Ticket found!</span>
                </div>
            </div>
        </div>

    </div>
</template>