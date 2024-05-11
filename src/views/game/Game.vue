<template>
    <div class="relative game-in game-bg w-full min-h-screen flex flex-col md:justify-start items-center">
        <Controls />
        <Container @gameEnded="gameEnded" :characters="characterStore.getCharactersGameReady"/>
        <Modal v-if="showEndGameModal" :gameStatus="gameStatus" />
    </div>
    <audio controls ref="flipSFX" class="hidden">
        <source src="./../../assets/card_sound_effect.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import Modal from '@/components/Modal.vue'
import Container from './Container.vue';
import Controls from './Controls.vue';
import { useRouter } from 'vue-router';
import { useCharacterStore } from '@/store/CharacterStore';
import { useGameStore } from '@/store/GameStore';

const router = useRouter();

const gameStatus = ref("")
const characterStore = useCharacterStore()
const gameStore = useGameStore()
const showEndGameModal = ref(false)

const flipSFX = ref(null)

// Evaluate if gamestatus is ready
if(!gameStore.getGameStatus) {
    router.push('/');
}

const flipCardSFX = () =>{
    flipSFX.value.pause();
    flipSFX.value.currentTime = 0;
    flipSFX.value.play()
}

onMounted(() => {
    flipCardSFX()
})

const gameEnded = (status) => {
    showEndGameModal.value = true
    gameStatus.value = status
}

</script>
