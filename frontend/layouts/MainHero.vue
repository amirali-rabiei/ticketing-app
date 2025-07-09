<script setup>
import { ArrowRightCircle } from 'lucide-vue-next';
import { onMounted, ref } from 'vue'

const text = "All tickets in on place"
const displayedText = ref('')
let index = 0
let typing = true

const typeLetter = () => {

    if (typing) {
        if (index < text.length) {
            displayedText.value += text.charAt(index)
            index++
            setTimeout(typeLetter, 50)

        } else {
            typing = false
            setTimeout(typeLetter, 1000)
        }
    }
    else {
        if (index > 0) {
            displayedText.value = displayedText.value.slice(0, -1)
            index--
            setTimeout(typeLetter, 40)

        } else {
            typing = true
            setTimeout(typeLetter, 40)

        }
    }
}

onMounted(async () => {
    typeLetter()
})


</script>

<template>
    <div class="mt-[100px]">
        <div class="flex justify-around flex-col md:flex-row items-center  ">
            <div class="w-full md:w-[500px] md:text-left md:items-start flex flex-col p-2 text-center items-center relative">
                <h2 class="text-2xl font-extrabold text-[#1F2D3D] leading-snug absolute top-[-50%]">{{ displayedText
                }}</h2>
                <p class="text-gray-600 text-sm leading-relaxed">With AllTix, buy flight, concert, cinema, theater
                    and any event
                    tickets conveniently, quickly and
                    securely.</p>
                <div class="bg-blue-600 text-white px-4 py-2 rounded-xl w-fit mt-1 flex gap-x-2">
                    <ArrowRightCircle />
                    <a href="/register">Start right now</a>
                </div>
            </div>
            <div class="relative top-3.5">
                <img class="w-[200px] md:w-[297px] rounded-xl" src="../src/assets/f.jpeg" alt="image">
                <div class="flex flex-col gap-y-[10px] left-[-20%] top-0 md:top-15 absolute">
                    <div class="bg-white rounded-xl shadow-xl p-2 text-[#1F2D3D] w-[220px] md:w-[220px]">
                        <p class="text-sm md:text-xs lg:text-sm font-semibold text-blue-700">🌍 Explore</p>
                        <p class="text-xs text-gray-600">Explore whole world with AllTix</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-xl p-2 text-[#1F2D3D] w-[200px]">
                        <p class="text-sm font-semibold text-blue-700">🎟 Your Ticket</p>
                        <p class="text-xs text-gray-600">Buy tickets for every events</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-xl p-2 text-[#1F2D3D w-[180px]">
                        <p class="text-sm font-semibold text-blue-700">🎉 Let's Go!</p>
                        <p class="text-xs text-gray-600">Enjoy your next adventrue</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>