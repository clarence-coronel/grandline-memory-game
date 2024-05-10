<template>
    <div class="w-full flex justify-center p-5 items-start pt-[20vh] min-h-screen fixed bg-black/70 z-50">
        <div class="flex flex-col justify-start items-center bg-white w-96 h-64 rounded-lg p-5 gap-5">
            <h1 class="text-green-500 font-bold text-3xl">Victory!</h1>
            <div class="flex flex-col gap-3 w-full max-w-[300px]">
                <div class="flex gap-5 items-center justify-center">
                    <span class="h-0.5 w-3 bg-black"></span>
                    <div class="w-full flex flex-col">
                        <div class="font-semibold flex justify-between gap-1">Berries: <span>{{ berries }}</span></div>
                        <div class="font-semibold flex justify-between gap-1">Time: <span>{{ time }}s</span></div>
                    </div>
                </div>
                <div class="border-t-2 flex justify-between gap-5 items-center font-semibold">Total Berries: <span :class="{'animate-pulse text-primary': populateReducedBerriesFinished}" class="font-bold text-3xl">{{totalBerries}}</span></div>
            </div>
            <button @click="backToMenu" :disabled="!populateReducedBerriesFinished" class="disabled:bg-neutral-300 disabled:hover:cursor-not-allowed duration-200 text-white bg-green-500 px-3 py-2 rounded-lg">Play again?</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useGameStore } from '@/store/GameStore';
import { useRouter } from "vue-router";

const gameStore = useGameStore()
const router = useRouter()

const totalBerries = ref(0)
const berries = ref(0)
const time = ref(0)

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
}, 20)


const reduceTotalBerries = setInterval(() => {
    if(populateTimeFinished.value){
        if(totalBerries.value != (berries.value - time.value)){
            totalBerries.value-=1
        }
        else{
            populateReducedBerriesFinished.value = true
            clearInterval(reduceTotalBerries)
        }
    }
}, 20)

const backToMenu = () => {
    gameStore.toggleGameStatus()
    router.push('/');
}


</script>
