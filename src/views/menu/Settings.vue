<template>
  <div
    class="bg-transparent border-transparent border-2 text-white w-full max-w-[1200px] overflow-auto rounded-lg p-5"
  >
    <form
      @submit.prevent="save"
      class="w-full max-w-[400px] mx-auto flex flex-col gap-5"
    >
      <label for="playerName" class="flex flex-col gap-1">
        <span>Name: </span>
        <input
          @input="toggleSave"
          v-model.trim="form.playerName"
          class="focus:outline-none outline-none bg-transparent rounded-sm border-2 border-white p-1"
          type="text"
          name="playerName"
          id="playerName"
        />
        <span ref="nameWarning" class="text-red-500"></span>
      </label>

      <div class="flex flex-col gap-1">
        <span>Difficulty: </span>
        <div class="flex justify-between gap-5 flex-wrap">
          <label
            for="difficulty_easy"
            class="flex items-center justify-start gap-1"
          >
            <span>Easy</span>
            <input
              @change="handleDifficultyChange"
              v-model="form.difficulty"
              type="radio"
              name="difficulty"
              id="difficulty_easy"
              value="EASY"
            />
          </label>
          <label
            for="difficulty_normal"
            class="flex items-center justify-start gap-1"
          >
            <span>Normal</span>
            <input
              @change="handleDifficultyChange"
              v-model="form.difficulty"
              type="radio"
              name="difficulty"
              id="difficulty_normal"
              value="NORMAL"
            />
          </label>
          <label
            for="difficulty_hard"
            class="flex items-center justify-start gap-1"
          >
            <span>Hard</span>
            <input
              @change="handleDifficultyChange"
              v-model="form.difficulty"
              type="radio"
              name="difficulty"
              id="difficulty_hard"
              value="HARD"
            />
          </label>
          <label
            for="difficulty_custom"
            class="flex items-center justify-start gap-1"
          >
            <span>Custom</span>
            <input
              @change="handleDifficultyChange"
              v-model="form.difficulty"
              type="radio"
              name="difficulty"
              id="difficulty_custom"
              value="CUSTOM"
            />
          </label>
        </div>
        <span class="text-orange-500">{{
          form.difficulty == "CUSTOM"
            ? "Custom games are not eligible for leaderboard entry"
            : ""
        }}</span>
      </div>

      <label for="numOfCards" class="flex flex-col gap-1">
        <span>Card Count: </span>
        <input
          @input="toggleSave"
          v-model="form.numOfCards"
          :disabled="inputDisabled"
          class="disabled:bg-neutral-400/70 disabled:text-neutral-300 disabled:hover:cursor-not-allowed focus:outline-none outline-none bg-transparent rounded-sm border-2 border-white p-1"
          type="text"
          name="numOfCards"
          id="numOfCards"
        />
        <span ref="cardWarning" class="text-red-500"></span>
      </label>

      <label for="hp" class="flex flex-col gap-1">
        <span>HP: </span>
        <input
          @input="toggleSave"
          v-model="form.hp"
          :disabled="inputDisabled"
          class="disabled:bg-neutral-400/70 disabled:text-neutral-300 disabled:hover:cursor-not-allowed focus:outline-none outline-none bg-transparent rounded-sm border-2 border-white p-1"
          type="text"
          name="hp"
          id="hp"
        />
        <span ref="hpWarning" class="text-red-500"></span>
      </label>

      <label for="damage" class="flex flex-col gap-1">
        <span>Damage: </span>
        <input
          @input="toggleSave"
          v-model="form.damage"
          :disabled="inputDisabled"
          class="disabled:bg-neutral-400/70 disabled:text-neutral-300 disabled:hover:cursor-not-allowed focus:outline-none outline-none bg-transparent rounded-sm border-2 border-white p-1"
          type="text"
          name="damage"
          id="damage"
        />
        <span ref="damageWarning" class="text-red-500"></span>
      </label>

      <button
        :disabled="saveDisabled"
        class="mt-10 disabled:bg-neutral-400 bg-green-600 hover:bg-green-500 duration-200 font-bold text-white rounded-sm p-2"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useSettingsStore } from "@/store/SettingsStore";

const settingsStore = useSettingsStore();

const form = reactive({
  playerName: "Buggy D. Clown",
  difficulty: "NORMAL",
  hp: 100,
  numOfCards: 10,
  damage: 4,
});

const nameWarning = ref(null);
const cardWarning = ref(null);
const hpWarning = ref(null);
const damageWarning = ref(null);

const saveDisabled = ref(true);

const inputDisabled = computed(() => {
  if (form.difficulty != "CUSTOM") return true;
  return false;
});

const toggleSave = () => {
  if (saveDisabled.value) saveDisabled.value = false;
};

onMounted(() => {
  const difficulty = settingsStore.getDifficulty;
  form.difficulty = difficulty;

  form.playerName = settingsStore.getPlayerName;

  if (difficulty != "CUSTOM") handleDifficultyChange(false);
  else {
    form.numOfCards = settingsStore.getNumberOfCards;
    form.hp = settingsStore.getHp;
    form.damage = settingsStore.getDamage;
  }
});

const handleDifficultyChange = (initial = true) => {
  if (initial) toggleSave();

  if (form.difficulty === "EASY") {
    form.hp = "50";
    form.numOfCards = "5";
    form.damage = "3";
  } else if (form.difficulty === "NORMAL") {
    form.hp = "100";
    form.numOfCards = "10";
    form.damage = "4";
  } else if (form.difficulty === "HARD") {
    form.hp = "80";
    form.numOfCards = "15";
    form.damage = "4";
  }
};

const save = () => {
  nameWarning.value.innerText = "";
  cardWarning.value.innerText = "";
  hpWarning.value.innerText = "";
  damageWarning.value.innerText = "";

  if (!form.playerName || form.playerName === "") {
    nameWarning.value.innerText = "Name cannot be empty";
    return;
  } else if (form.playerName.length > 20) {
    nameWarning.value.innerText = "Name must not exceed 20 characters";
    return;
  } else if (!form.numOfCards || form.numOfCards == "") {
    cardWarning.value.innerText = "Card count cannot be empty";
    return;
  } else if (parseInt(form.numOfCards) < 5) {
    cardWarning.value.innerText = "Card count cannot be less than 5";
    return;
  } else if (parseInt(form.numOfCards) > 20) {
    cardWarning.value.innerText = "Card count must not exceed 20";
    return;
  } else if (isNaN(form.numOfCards)) {
    cardWarning.value.innerText = "Card count must only be numbers";
    return;
  } else if (!form.hp || form.hp == "") {
    hpWarning.value.innerText = "HP cannot be empty";
    return;
  } else if (parseInt(form.hp) < 1) {
    hpWarning.value.innerText = "HP cannot be less than 1";
    return;
  } else if (parseInt(form.hp) > 1000) {
    hpWarning.value.innerText = "HP must not exceed 1000";
    return;
  } else if (isNaN(form.hp)) {
    hpWarning.value.innerText = "HP must only be numbers";
    return;
  } else if (!form.damage || form.damage == "") {
    damageWarning.value.innerText = "Damage cannot be empty";
    return;
  } else if (parseInt(form.damage) < 1) {
    damageWarning.value.innerText = "HP cannot be less than 1";
    return;
  } else if (parseInt(form.damage) > 1000) {
    damageWarning.value.innerText = "Damage must not exceed 1000";
    return;
  } else if (isNaN(form.damage)) {
    damageWarning.value.innerText = "Damage must only be numbers";
    return;
  }

  settingsStore.setPlayerName(form.playerName);
  settingsStore.setDifficulty(form.difficulty);
  settingsStore.setNumberOfCards(form.numOfCards);
  settingsStore.setHp(form.hp);
  settingsStore.setDamage(form.damage);

  saveDisabled.value = true;
};
</script>

<style lang="scss" scoped></style>
