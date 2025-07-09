<script setup>
import { Instagram, Twitter, Youtube } from 'lucide-vue-next';
</script>
<template>
    <div class="bg-[#1F2D3D] text-white py-8 w-full mt-[100px]">
        <div class="flex flex-col gap-y-5 text-center justify-around md:flex-row">
            <div>
                <h2 class="text-xl font-bold">AllTix</h2>
                <p class="text-sm text-gray-300">Your one-stop destination for tickets to all events.</p>
            </div>

            <div class="flex flex-col gap-y-1.5">
                <h3 class="text-md font-semibold">Links</h3>
                <a href="/" class="text-sm text-gray-300">Home</a>
                <a href="/" class="text-sm text-gray-300">About</a>
                <a href="/" class="text-sm text-gray-300">Contacts</a>
                <a href="/" class="text-sm text-gray-300">Terms</a>
            </div>
            <div class="flex flex-col gap-y-1.5 items-center">
                <h3 class="text-md font-semibold">Follow Us</h3>
                <Instagram />
                <Youtube />
                <Twitter />
            </div>
        </div>

        <div class="border-t border-gray-600 text-gray-300 text-center mt-8 pt-4 text-sm">
            © 2025 AllTix. All rights reserved.
        </div>
    </div>

</template>