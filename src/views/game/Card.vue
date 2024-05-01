<template>
    <button @click="selectCard" class="card-bg focus:outline-none outline-none flex justify-center p-3 items-center md:hover:-translate-y-3 duration-200 w-full max-w-64 aspect-[5/7] rounded-lg bg-secondary">
        <div class="flex flex-col justify-center items-center p-5 border-2 border-white rounded-lg">
            <img class="max-w-40 w-full aspect-square object-contain object-center" src="https://1000logos.net/wp-content/uploads/2023/05/Straw-Hat-Logo.png" alt="">
            <span class="font-Bangers tracking-wider text-white text-2xl text-center">Grandline Memory Game</span>
        </div>
    </button>
</template>

<script setup>
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
})

const selectCard = () => {
    alert(props.name + " " + props.image)
}

</script>
