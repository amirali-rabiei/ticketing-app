<script setup>
import axios from 'axios';
import { ref } from 'vue';


const title = ref('')
const description = ref('')
const date = ref('')
const location = ref('')
const capacity = ref('')
const price = ref('')
const available = ref('')
const category = ref('')
const s = ref('')
const errorMessage = ref('')

const HandleSubmit = async (e) => {
    try {


        if (!title.value) {
            errorMessage.value = 'please fill the title'
        } else if (!description.value) {
            errorMessage.value = 'please fill the description'
        } else if (!date.value) {
            errorMessage.value = 'please fill the date'
        } else if (!location.value) {
            errorMessage.value = 'please fill the locaiton'
        } else if (!capacity.value) {
            errorMessage.value = 'please fill the capacity'
        } else if (!price.value) {
            errorMessage.value = 'please fill the price'
        } else if (!category.value) {
            errorMessage.value = 'please select a category'
        } else {

            errorMessage.value = ''
            const selectedCategory = category.value



            const data = {
                title: title.value,
                description: description.value,
                date: new Date(`${date.value}`).toISOString(),
                location: location.value,
                capacity: capacity.value,
                price: price.value,
                available: 33,
                category: selectedCategory
            }


            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/addTicket`, data, {
                withCredentials: true
            })
        }

    } catch (error) {
        console.log(error)
    }
}


const getSelectedGategory = (e) => {
    category.value = e.target.value
}

</script>


<template>
    <div>
        <form class="p-2 flex flex-col items-center">
            <div class="flex flex-col md:flex-row gap-x-2">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="Title">
                        Title
                    </label>
                    <input v-model="title"
                        class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Title" type="text" placeholder="Ticket Title">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                        Description
                    </label>
                    <input v-model="description"
                        class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description" type="text" placeholder="Ticket Description">
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-x-2">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                        Date
                    </label>
                    <input v-model="date"
                        class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date" type="datetime-local">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
                        Location
                    </label>
                    <input v-model="location"
                        class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location" type="text" placeholder="Ticket Location">
                </div>
            </div>
            <div class="flex flex-col md:flex-row  gap-x-2">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="capacity">
                        Capacity
                    </label>
                    <input v-model="capacity"
                        class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="capacity" type="text" placeholder="Ticket Capacity">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
                        Price
                    </label>
                    <input v-model="price"
                        class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price" type="text" placeholder="Ticket Price">
                </div>
            </div>
            <div class="flex flex-col md:flex-row  gap-x-2">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="available">
                        Available
                    </label>
                    <input v-model="available"
                        class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="available" type="text" placeholder="Ticket Available">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
                        Category
                    </label>

                    <select v-on:change="getSelectedGategory"
                        class="shadow appearance-none border-[#4C80F0] border-1 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">not selected</option>
                        <option value="SCIENCE">science</option>
                        <option value="ENTERTAINMENT">entertainment</option>
                        <option value="SPORT">sport</option>
                        <option value="CINEMA">cinema</option>
                    </select>
                </div>
            </div>
            {{ errorMessage }}
            <button @click.prevent="HandleSubmit"
                class="bg-blue-500 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
                Add Ticket
            </button>

        </form>
    </div>
</template>