<template>
    <div class="p-5 flex flex-wrap gap-5 place-content-center place-items-center w-full h-fit max-w-[1600px] mx-auto shadow-md rounded-xl">
        <Card :name="character.name" :image="character.imageUrl" v-for="character, index in characters" :key="index"/>
    </div>
</template>

<script setup>
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