<template>
    <div class="w-full flex justify-center p-5 items-start pt-[20vh] min-h-screen fixed bg-black/70 z-50">
        <div v-if="gameStatus == 'VICTORY'" class="flex flex-col justify-start items-center bg-white w-96 rounded-lg p-5 gap-5">
            <h1 class="text-green-500 font-bold text-3xl">Victory!</h1>
            <div class="flex flex-col gap-3 w-full max-w-[300px]">
                <div class="flex gap-5 items-center justify-center">
                    <span class="h-0.5 w-3 bg-black"></span>
                    <div class="w-full flex flex-col">
                        <div class="font-semibold flex justify-between gap-1">Berries: <span>{{ berries }}</span></div>
                        <div class="font-semibold flex justify-between gap-1">Time: <span>{{ time }}s</span></div>
                    </div>
                </div>
                <div class="border-t-2 flex justify-between gap-5 items-center font-semibold">Total Berries: <span class="font-bold text-3xl">{{totalBerries}}</span></div>
            </div>
            <div class="text-lg text-green-500 font-bold border-2 border-green-500 p-2 rounded-full" v-if="newTopScore">New top score!</div>
            <button @click="backToMenu" :disabled="!populateReducedBerriesFinished" class="disabled:bg-neutral-300 disabled:hover:cursor-not-allowed duration-200 text-white bg-green-500 px-3 py-2 rounded-lg">Play again?</button>
        </div>

        <div v-else class="flex flex-col justify-start items-center bg-white w-96 ounded-lg p-5 gap-5">
            <h1 class="text-red-500 font-bold text-3xl">Defeat!</h1>
            <img class="rounded-md" src="https://gifdb.com/images/high/sad-anime-one-piece-luffy-y8312ajtt5s2r2pu.gif" alt="Luffy crying gif">
            <button @click="backToMenu" class="disabled:bg-neutral-300 disabled:hover:cursor-not-allowed duration-200 text-white bg-green-500 px-3 py-2 rounded-lg">Play again?</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useGameStore } from '@/store/GameStore';
import { useSettingsStore } from "@/store/SettingsStore";
import { useRouter } from "vue-router";

const props = defineProps({
    gameStatus: {
        type: String
    }
})

const gameStore = useGameStore()
const settingsStore = useSettingsStore()
const router = useRouter()

const totalBerries = ref(0)
const berries = ref(0)
const time = ref(0)

const newTopScore = ref(false)

let populateBerriesFinished = ref(false)
let populateTimeFinished = ref(false)
let populateReducedBerriesFinished = ref(false)

const populateBerries = setInterval(() => {
    if(berries.value != gameStore.getBerries){
        berries.value+=1
    }
    else{
        totalBerries.value = gameStore.getBerries
        setTimeout(() => {
            populateBerriesFinished.value = true
            clearInterval(populateBerries)
        }, 1000)
    }
}, 1)


const populateTime = setInterval(() => {
    if(populateBerriesFinished.value){
        if(time.value != gameStore.getTime){
            time.value+=1
        }
        else{
            setTimeout(() => {
                populateTimeFinished.value = true
                clearInterval(populateTime)
            }, 1000)
        }
    }
}, 1)


const reduceTotalBerries = setInterval(() => {
    if(populateTimeFinished.value){
        if(totalBerries.value != (berries.value - time.value)){
            totalBerries.value-=1
        }
        else{
            clearInterval(reduceTotalBerries)
            populateReducedBerriesFinished.value = true
            if(totalBerries.value > settingsStore.getTopScore.berries){
                newTopScore.value = true
                settingsStore.setTopScore(totalBerries.value)
            }

            console.log(settingsStore.getTopScore.berries)
            // console.log(settingsStore.getTopScore)
            
        }
    }
}, 1)

const backToMenu = () => {
    gameStore.toggleGameStatus()
    gameStore.setTime(0)
    gameStore.setBerries(0)
    router.push('/');
}


</script>
