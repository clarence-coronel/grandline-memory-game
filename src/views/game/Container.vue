<template>
    <div class="grid table-container p-5 md:flex flex-wrap gap-2 md:gap-5 place-content-center place-items-center w-full h-fit max-w-[1600px] mx-auto shadow-md rounded-xl">
        <Card :id="character.id" :index="index" :name="character.name" :image="character.imageUrl" v-for="character, index in characters" :key="index"/>
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