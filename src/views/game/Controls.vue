<template>
  <div
    class="w-full p-2 md:p-3 bg-black/60 shadow-black flex justify-center items-center sticky left-0 top-0 z-50"
  >
    <div
      class="w-full max-w-[1600px] flex flex-col md:flex-row justify-center items-center md:justify-between gap-5 md:gap-12"
    >
      <div class="flex gap-5 w-full max-w-[700px] items-center">
        <span class="font-medium text-base md:text-xl text-white">HP</span>
        <div
          class="bg-neutral-600 w-full max-w-[700px] h-3 md:h-5 rounded-md overflow-hidden"
        >
          <div
            :style="{ width: `${hpLeft}%` }"
            :class="{
              'bg-red-500 animate-pulse': hpLeft <= 20,
              'bg-orange-500': hpLeft <= 40 && hpLeft > 20,
              'bg-green-500': hpLeft > 40,
            }"
            class="h-full duration-200"
          ></div>
        </div>
      </div>

      <div class="flex gap-10">
        <div class="flex gap-2 items-center">
          <span class="font-medium text-base md:text-xl text-white"
            >Berries
          </span>
          <span class="font-bold text-lg md:text-2xl text-white">{{
            gameStore.getBerries
          }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <span class="font-medium text-base md:text-xl text-white">Time </span>
          <span class="font-bold text-lg md:text-2xl text-white"
            >{{ time }}s</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useSettingsStore } from "@/store/SettingsStore";
import { useGameStore } from "@/store/GameStore";

const settingsStore = useSettingsStore();
const gameStore = useGameStore();

const hpLeft = computed(() => {
  const hp = (gameStore.getHp / settingsStore.getHp) * 100;

  if (hp < 1) return 0;
  else return hp;
});

let timer = null;
let time = ref(0);

onMounted(() => {
  timer = setInterval(() => {
    if (gameStore.getCardsLeft == 0 || gameStore.getHp == 0)
      clearInterval(timer);

    if (time.value <= 3600) time.value++;
    gameStore.setTime(time.value);
  }, 1000);
});
</script>
