<script setup>
import { Clapperboard, Guitar, PlaneTakeoff, Volleyball } from 'lucide-vue-next';

</script>

<template>
    <div class="mt-[100px]">
        <div class="flex flex-col md:flex-row justify-center gap-x-[50px] gap-y-2.5">
            <div
                class="bg-white rounded-[5px] shadow-xl p-2 text-[#1F2D3D] w-full md:w-[220px] flex gap-x-4 items-center">
                <div>
                    <p class="text-sm font-semibold text-blue-700">Concert</p>
                    <Guitar size="25" />
                </div>
                <p class="text-xs text-gray-600">Fill the music live - with live AllTix</p>
            </div>
            <div
                class="bg-white rounded-[5px] shadow-xl p-2 text-[#1F2D3D] w-full md:w-[220px] flex gap-x-4 items-center">
                <div>
                    <p class="text-sm font-semibold text-blue-700">Sport</p>
                    <Volleyball size="25" />
                </div>
                <p class="text-xs text-gray-600">Catch the thrill of every math - only on AllTix</p>
            </div>
            <div
                class="bg-white rounded-[5px] shadow-xl p-2 text-[#1F2D3D] w-full md:w-[220px] flex gap-x-4 items-center">
                <div>
                    <p class="text-sm font-semibold text-blue-700">Cinema</p>
                    <Clapperboard size="25" />
                </div>
                <p class="text-xs text-gray-600">Your ticket to the latest blockbusters</p>
            </div>
            <div
                class="bg-white rounded-[5px] shadow-xl p-2 text-[#1F2D3D] w-full md:w-[220px] flex gap-x-4 items-center">
                <div>
                    <p class="text-sm font-semibold text-blue-700">Travel</p>
                    <PlaneTakeoff size="25" />
                </div>
                <p class="text-xs text-gray-600">Fly anywhere - start your journey with AllTix</p>
            </div>

        </div>
    </div>
</template>