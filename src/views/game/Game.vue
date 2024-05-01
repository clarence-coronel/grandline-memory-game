<template>
    <div class="w-full min-h-screen flex justify-center items-center">
        <Table v-if="!isPending" :characters="characters"/>
    </div>
</template>

<script setup>
import Table from './Table.vue';
import { useFetch } from '@/composables/useFetch';
import { onMounted, ref } from 'vue';

const characters = ref([])
const { getData, isPending } = useFetch(process.env.VUE_APP_CHAR_API_URL)

onMounted(async () => {
    const response = await getData()
    characters.value = await sliceRandomly(response.data.map(data => {
        return { name: data.character.name, imageUrl: data.character.images.jpg.image_url}
    }), 3)
})

const sliceRandomly = (arr = [], max) => {

    const newArr = []
    const selectedIndexs = []

    for(let i = 0; i < max; i++){
        let random = getRandomInt(0, arr.length)

        while(selectedIndexs.includes(random)){
            random = getRandomInt(0, arr.length)
        }

        newArr.push(arr[random])
    }

    return newArr
}


const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>
