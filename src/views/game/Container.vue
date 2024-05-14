<template>
    <div class="grid table-container p-5 md:flex flex-wrap gap-2 md:gap-5 place-content-center place-items-center w-full h-fit max-w-[1600px] mx-auto shadow-md rounded-xl">
        <Card :disabled="disableCards" @selectCard="selectCard" :id="character.id" :index="index" :name="character.name" :image="character.imageUrl" v-for="character, index in characters" :key="index"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from './Card.vue';

import { useGameStore } from '@/store/GameStore';
import { useSettingsStore } from '@/store/SettingsStore';

const gameStore = useGameStore()
const settingsStore = useSettingsStore()

const disableCards = ref(false)

const props = defineProps({
    characters: {
        type: Array,
        default: []
    }
})

const emits = defineEmits(['gameEnded'])

gameStore.setHp(settingsStore.getHp)

const selectCard = (payload) => {

    // Selecting Card
    if(!gameStore.getFirstCard){
        gameStore.updateFirstCard(payload)
    } 
    else if (!gameStore.getSecondCard){
        gameStore.updateSecondCard(payload)
    }

    if(gameStore.getFirstCard && gameStore.getSecondCard){
        disableCards.value = true
        if(gameStore.validateSelectedCards()){
            setTimeout(() => {
                gameStore.getFirstCard.remove()
                gameStore.getSecondCard.remove()

                gameStore.addBerries(100 * gameStore.getStreak)
                gameStore.incrementStreak()
                
                gameStore.updateFirstCard()
                gameStore.updateSecondCard()

                disableCards.value = false

                showEndGameModal()
            }, 1500)
        }
        else{
            setTimeout(() => {
                gameStore.getFirstCard.toggle()
                gameStore.getSecondCard.toggle()
                gameStore.inflictDamage(settingsStore.getDamage)
                gameStore.updateFirstCard()
                gameStore.updateSecondCard()

                gameStore.resetStreak()

                disableCards.value = false
                console.log(gameStore.getHp)

                showEndGameModal()
            }, 1500)
        }
    }


    const showEndGameModal = () => {
        if(gameStore.evaluateGameStatus() === "VICTORY" || gameStore.evaluateGameStatus() === "DEFEAT"){
            disableCards.value = true
            emits('gameEnded', gameStore.evaluateGameStatus())
        }
    }
}
</script>
