<template>
    <button @click="toggleShowCard" :class="{'show-card': showCard, 'hide-card hover:shadow-secondary ': !showCard}" class="card-bg focus:outline-none outline-none flex justify-center p-1 md:p-3 items-center duration-500 w-full max-w-64 aspect-[5/8] rounded-lg bg-primary">
        <div class="w-full h-full flex flex-col justify-center items-center rounded-lg overflow-hidden">
            <!-- Frontside -->
            <div :class="{'flex': showContent, 'hidden': !showContent}" class="w-full h-full flex-col gap-1 justify-between items-center rounded-lg">
                <img draggable="false" :src="image" class="select-none border-2 md:border-4 border-white w-full h-[80%] rounded-lg object-cover object-top" alt="">
                <span class="flex justify-center items-center w-full h-[20%] text-white font-bold text-xs md:text-lg text-center">{{ truncate(name, 30) }}</span>
            </div>

            <!-- Backside -->
            <div :class="{'hidden': showContent, 'flex': !showContent}" class="w-full h-full flex-col justify-center items-center p-3 md:p-5">
                <img draggable="false" class="select-none max-w-40 w-full aspect-square object-contain object-center" src="https://1000logos.net/wp-content/uploads/2023/05/Straw-Hat-Logo.png" alt="">
                <span class="select-none font-Bangers tracking-wider text-white text-base md:text-2xl text-center">Grandline Memory Game</span>
            </div>

        </div>
    </button>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
})

const showCard = ref(false)
const showContent = ref(false)

const toggleShowCard = () => {
    showCard.value = !showCard.value

    if(showCard.value){
        setTimeout(() => {
            showContent.value = true
        }, 300)
    }
    else{
        setTimeout(() => {
            showContent.value = false
        }, 300)
    }
}

const truncate = (str, limit) => {
    if(str.length > limit) return str.substring(0, limit) + '...'
    return str
}

</script>
