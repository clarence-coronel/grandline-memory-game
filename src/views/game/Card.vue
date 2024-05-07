<template>
    <button :disabled="cardDisabled || disabled || fadeCard" @click="toggleShowCard(true)" :class="{'show-card md:hover:scale-105': showCard, 'hide-card ': !showCard, 'fade-card': fadeCard, 'md:hover:shadow-black-v2': !fadeCard}" class="card-bg focus:outline-none outline-none flex justify-center p-1 md:p-3 items-center duration-500 w-full max-w-44 aspect-[5/8] rounded-lg bg-primary">
        <div class="w-full h-full flex flex-col justify-center items-center rounded-lg overflow-hidden">
            <!-- Frontside -->
            <div :class="{'flex': showContent, 'hidden': !showContent}" class="w-full h-full flex-col gap-1 justify-between items-center rounded-lg">
                <img draggable="false" :src="image" class="select-none border-2 md:border-4 border-white w-full h-[80%] rounded-lg object-cover object-top" alt="">
                <span class="flex justify-center items-center w-full h-[20%] text-white font-bold text-xs md:text-base text-center">{{ truncate(name, 30) }}</span>
            </div>

            <!-- Backside -->
            <div :class="{'hidden': showContent, 'flex': !showContent}" class="w-full h-full flex-col justify-center items-center p-3 md:p-5">
                <span class="text-white text-sm md:text-base font-bold md:hidden">#{{index+1}}</span>
                <img draggable="false" class="select-none max-w-40 w-full aspect-square object-contain object-center" src="https://1000logos.net/wp-content/uploads/2023/05/Straw-Hat-Logo.png" alt="">
                <span class="select-none font-Bangers tracking-wider text-white text-sm md:text-lg text-center">Grandline Memory Game</span>
            </div>
        </div>
    </button>

    <audio controls ref="flipSFX" class="hidden">
        <source src="./../../assets/card_sound_effect.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import { useGameStore } from '@/store/GameStore';

const gameStore = useGameStore()

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    index: {
        type: Number,
        default: 0
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['selectCard'])

const cardDisabled = ref(false)
const flipSFX = ref(null)
const showCard = ref(false)
const showContent = ref(false)
const fadeCard = ref(false)

const toggleShowCard = (emit = false) => {

    // Toggle showCard
    showCard.value = !showCard.value

    // Disable card while flipping
    cardDisabled.value = true

    // Play flip sfx
    flipCardSFX()

    //Show card content with delay, so it would change 
    //content right in the middle
    setTimeout(() => {
        showContent.value = !showContent.value
    }, 300)
    

    // Enable card after flip
    setTimeout(()=> {
        cardDisabled.value = false
    }, 600)

    if(!showCard.value) return

    if(emit) emits('selectCard', {id: props.id, toggle: toggleShowCard, remove: removeCard})
}

const removeCard = () => fadeCard.value = true

const flipCardSFX = () =>{
    flipSFX.value.pause();
    flipSFX.value.currentTime = 0;
    flipSFX.value.play()
}

const truncate = (str, limit) => {
    if(str.length > limit) return str.substring(0, limit) + '...'
    return str
}

</script>
