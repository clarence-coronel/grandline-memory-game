<template>
    <div class="game-in game-bg w-full min-h-screen flex flex-col md:justify-start items-center">
        <Controls />
        <Container :characters="characterStore.getCharactersGameReady"/>
    </div>
</template>

<script setup>
import { watchEffect } from 'vue';
import Container from './Container.vue';
import Controls from './Controls.vue';
import { useRouter } from 'vue-router';
import { useCharacterStore } from '@/store/CharacterStore';
import { useGameStore } from '@/store/GameStore';

const router = useRouter();

const characterStore = useCharacterStore()
const gameStore = useGameStore()


// Evaluate if gamestatus is ready
if(!gameStore.getGameStatus) {
    router.push('/');
}
</script>
