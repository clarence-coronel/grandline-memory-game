<template>
    <div class="w-full p-2 md:p-3 bg-black/60 shadow-black flex justify-center items-center sticky left-0 top-0 z-50">
        <div class="w-full max-w-[1600px] flex flex-col md:flex-row justify-center items-center gap-5 md:gap-12">
            <div class="flex gap-5 w-full max-w-[700px] items-center">
                <span class="font-medium text-base md:text-xl text-white">HP</span>
                <div class="bg-neutral-600 w-full max-w-[700px] h-3 md:h-5 rounded-md overflow-hidden">
                    <div class="w-4/5 h-full bg-green-500 duration-200"></div>
                </div>
            </div>
            <div class="flex gap-10">
                <div class="flex gap-2 items-center">
                    <span class="font-medium text-base md:text-xl text-white">Berries </span>
                    <span class="font-bold text-lg md:text-2xl text-white">20</span>
                </div>
                <div class="flex gap-2 items-center">
                    <span class="font-medium text-base md:text-xl text-white">Time </span>
                    <span class="font-bold text-lg md:text-2xl text-white">{{time}}s</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let timer = null
let time = ref(0)

onMounted(() => {
    timer = setInterval(() => {
        time.value++
    }, 1000);
})
</script>
