<template>
    <div class="p-5 grid gap-5 place-content-center place-items-center table-container w-full h-fit max-w-[1600px] mx-auto bg-neutral-100 shadow-md rounded-xl">
        <Card :name="character.name" :image="character.imageUrl" v-for="character, index in characters" :key="index"/>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import Card from './Card.vue';

const props = defineProps({
    characters: {
        type: Array,
        default: []
    }
})
</script>

<style lang="scss" scoped>

</style>