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

const router = useRouter();
const characterStore = useCharacterStore()

console.log(characterStore.getCharactersGameReady)

if(characterStore.getRawCharacters.length == 0) {
    router.push('/');
}
</script>
