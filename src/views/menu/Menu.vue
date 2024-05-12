<template>
    <div v-if="!characterStore.getIsPending" :class="{'menu-exit': addExitAnim}" class="menu-bg w-full">
        <div class="w-full flex flex-col items-center gap-5 min-h-screen bg-black/70 px-5 pt-10 pb-12 md:p-10">
            <div class="w-full flex justify-end">
                <button class="focus:outline-none outline-none text-white" @click="toggleMusic">
                    <svg class="aspect-square w-10 md:w-16" v-if="musicStore.getMusicStatus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M7 6v8h2V6zm4 0v8h2V6z"/></svg>
                    <svg class="aspect-square w-10 md:w-16" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 1200C268.65 1200 0 931.35 0 600S268.65 0 600 0s600 268.65 600 600s-268.65 600-600 600M450 300.45v599.1L900 600z"/></svg>
                </button>
            </div>

            <div class="w-fit flex-col flex justify-center gap-10 items-center flex-1">
                <img loading="eager" class="max-w-[700px] w-full object-fit object-center" src="https://1000logos.net/wp-content/uploads/2023/05/Straw-Hat-Logo.png" alt="">

                <div class="w-full flex justify-center items-center h-full">
                    <h1 class="font-Bangers tracking-wider text-white text-3xl md:text-6xl text-center">Grandline Memory Game</h1>
                </div>

                <div class="flex flex-col h-fit border-2 border-white w-full max-w-[300px] rounded-md overflow-hidden">
                    <button :disabled="disableButtons" @click="goToGame" class="md:hover:bg-white md:hover:text-primary md:hover:text-xl font-semibold text-lg text-white px-3 py-3 md:py-6 duration-200">Play</button>
                    <button :disabled="disableButtons" @click="" class="md:hover:bg-white md:hover:text-primary md:hover:text-xl font-semibold text-lg text-white px-3 py-3 md:py-6 duration-200">Leaderboard</button>
                    <button :disabled="disableButtons" @click="" class="md:hover:bg-white md:hover:text-primary md:hover:text-xl font-semibold text-lg text-white px-3 py-3 md:py-6 duration-200">Settings</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="relative w-full h-full min-h-screen flex flex-col justify-between items-center bg-primary/90 gap-5 px-5 pt-10 pb-12 md:p-10">
        <!-- <h1 class="font-Bangers tracking-wider text-white text-4xl">
            Grandline Memory Game
        </h1> -->
        <div class="w-full flex justify-end">
            <button class="text-white" @click="toggleMusic">
                <svg class="aspect-square w-10 md:w-16" v-if="musicStore.getMusicStatus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M7 6v8h2V6zm4 0v8h2V6z"/></svg>
                <svg class="aspect-square w-10 md:w-16" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 1200C268.65 1200 0 931.35 0 600S268.65 0 600 0s600 268.65 600 600s-268.65 600-600 600M450 300.45v599.1L900 600z"/></svg>
            </button>
        </div>
        <div class="flex flex-col w-full h-full justify-between items-center">
            <img class="max-w-[700px] w-full object-fit object-center" src="https://1000logos.net/wp-content/uploads/2023/05/Straw-Hat-Logo.png" alt="">
        </div>

        <svg class="text-white animate-spin" xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24">
            <defs><linearGradient id="mingcuteLoadingLine0" x1="50%" x2="50%" y1="5.271%" y2="91.793%"><stop offset="0%" stop-color="currentColor"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.55"/></linearGradient><linearGradient id="mingcuteLoadingLine1" x1="50%" x2="50%" y1="8.877%" y2="90.415%"><stop offset="0%" stop-color="currentColor" stop-opacity="0"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.55"/></linearGradient></defs><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="url(#mingcuteLoadingLine0)" d="M8.886.006a1 1 0 0 1 .22 1.988A8.001 8.001 0 0 0 10 17.944v2c-5.523 0-10-4.476-10-10C0 4.838 3.848.566 8.886.007Z" transform="translate(2 2.055)"/><path fill="url(#mingcuteLoadingLine1)" d="M14.322 1.985a1 1 0 0 1 1.392-.248A9.988 9.988 0 0 1 20 9.945c0 5.523-4.477 10-10 10v-2a8 8 0 0 0 4.57-14.567a1 1 0 0 1-.248-1.393" transform="translate(2 2.055)"/></g>
        </svg>

        <div class="flex flex-col gap-2 md:gap-5 w-full max-w-[900px] text-lg text-white font-semibold text-center">
            <span>Did you know?</span>
            <span class="text-sm font-normal md:text-base text-justify">{{selectedFact.fact}}</span>
        </div>
    </div>
    <audio controls ref="audio" class="hidden" loop>
        <source src="./../../assets/ost_music.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</template>

<script setup>
import { useMusicStore } from '@/store/MusicStore';
import { useCharacterStore } from '@/store/CharacterStore';
import { useGameStore } from '@/store/GameStore';
import { useFetch } from '@/composables/useFetch';
import facts from "@/data/facts.json"
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const musicStore = useMusicStore()
const gameStore = useGameStore()
const characterStore = useCharacterStore()

const addExitAnim = ref(false)
const disableButtons = ref(false)

const router = useRouter();
const audio = ref(null)

characterStore.setLimit(10)
characterStore.loadCharacters()


const toggleMusic = () => {
    // audio.value.play()

    musicStore.toggleMusicPlaying()

    if(musicStore.getMusicStatus) {
        // audio.value.currentTime = 0;
        audio.value.play()
        
    }
    else {
        audio.value.pause();
    }
}

const selectedFact = facts.OnePieceFacts[characterStore.getRandomInt(0, facts.OnePieceFacts.length)]

const goToGame = () => {
    disableButtons.value = true
    addExitAnim.value = true
    
    setTimeout(() => {
        audio.value.pause();
        audio.value.currentTime = 0;
        musicStore.setMusicPlaying = false
        gameStore.toggleGameStatus()
        router.push('/game');
    }, 1500)
    
}
</script>
