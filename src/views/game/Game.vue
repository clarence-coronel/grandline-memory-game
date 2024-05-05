<template>
    <div v-if="!isPending" class="game-bg w-full min-h-screen flex flex-col md:justify-start items-center">
        <Controls />
        <Container :characters="characters"/>
    </div>
    <div v-else class="relative w-full h-full min-h-screen flex flex-col justify-between items-center bg-primary/90 gap-2 p-5 py-10 md:p-10">
        <!-- <h1 class="font-Bangers tracking-wider text-white text-4xl">
            Grandline Memory Game
        </h1> -->
        <div class="w-full flex justify-end">
            <button class="text-white" @click="toggleMusic">
                <svg class="aspect-square w-10 md:w-16" v-if="playMusic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M7 6v8h2V6zm4 0v8h2V6z"/></svg>
                <svg class="aspect-square w-10 md:w-16" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 1200C268.65 1200 0 931.35 0 600S268.65 0 600 0s600 268.65 600 600s-268.65 600-600 600M450 300.45v599.1L900 600z"/></svg>
            </button>
        </div>
        <div class="flex flex-col w-full h-full justify-between items-center">
            <img class="max-w-[700px] w-full object-fit object-center animate-pulse" src="https://1000logos.net/wp-content/uploads/2023/05/Straw-Hat-Logo.png" alt="">
        </div>
        <div class="flex flex-col gap-2 md:gap-5 w-full max-w-[900px] text-lg text-white font-semibold text-center">
            <span>Did you know?</span>
            <span class="text-sm font-normal md:text-base text-justify">{{selectedFact.fact}}</span>
        </div>
    </div>
    <audio v-if="isPending" controls ref="flipSFX" class="hidden" loop>
        <source src="./../../assets/ost_music.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</template>

<script setup>
import Container from './Container.vue';
import Controls from './Controls.vue';
import { useFetch } from '@/composables/useFetch';
import { onMounted, ref } from 'vue';
import { useGameStore } from '@/store/GameStore';
import facts from "@/data/facts.json"

const gameStore = useGameStore()

const playMusic = ref(false)
const flipSFX = ref(null)
// gameStore.setTopScore(5500, 78)
// gameStore.resetTopScore()

// gameStore.setLastRoundScore(999, 69)
// console.log(gameStore.lastRoundScore)

// const tips = [
//     "Remember the positions of the cards you flip to increase your chances of finding matches!", 
//     "Try to prioritize flipping cards that are not yet revealed to uncover more options.",
//     "Keep track of which cards you've already flipped to avoid flipping them again unnecessarily.",
//     "Challenge yourself by increasing the grid size or adding more cards for a greater challenge."
// ]

const characters = ref([])
const { getData, isPending } = useFetch(process.env.VUE_APP_CHAR_API_URL)

onMounted(async () => {
    const response = await getData()

    characters.value = await sliceRandomly(response.data.map(data => {
        return { name: data.character.name, imageUrl: data.character.images.jpg.image_url}
    }), 20)
})

const sliceRandomly = (arr = [], max) => {

    const newArr = []
    const selectedIndexs = []

    for(let i = 0; i < max; i++){
        let random = getRandomInt(0, arr.length)

        while(selectedIndexs.includes(random)){
            random = getRandomInt(0, arr.length)
        }

        newArr.push(arr[random])
    }

    return newArr
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const toggleMusic = () => {
    // flipSFX.value.pause();
    // flipSFX.value.currentTime = 0;

    // flipSFX.value.play()

    playMusic.value = !playMusic.value

    if(playMusic.value) {
        // flipSFX.value.currentTime = 0;
        flipSFX.value.play()
    }
    else {
        flipSFX.value.pause();
    }
}

const selectedFact = facts.OnePieceFacts[getRandomInt(0, facts.OnePieceFacts.length)]
</script>
