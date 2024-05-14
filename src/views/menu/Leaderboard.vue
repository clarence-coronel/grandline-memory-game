<template>
  <div
    v-if="leaderboard"
    class="bg-transparent border-white border-2 text-white w-full max-w-[1200px] overflow-auto rounded-lg"
  >
    <table class="table-fixed w-full min-w-[600px]">
      <thead>
        <tr>
          <th class="text-center p-5 w-32">Rank</th>
          <th class="text-left p-5">Player Name</th>
          <th class="text-left p-5">Berries</th>
          <th class="text-left p-5">Difficulty</th>
          <th class="text-left p-5">Date & Time</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="{
            'hover:text-red-500 font-bold': entry.rank == 1,
            'hover:text-orange-500 font-bold': entry.rank == 2,
            'hover:text-yellow-500 font-bold': entry.rank == 3,
            'hover:text-green-500 font-bold':
              entry.rank > 3 && entry.rank <= 10,
            'hover:text-black ': entry.rank > 10,
          }"
          class="hover:bg-white hover:font-bold duration-200"
          v-for="(entry, index) in slice(activePage)"
          :key="index"
        >
          <td
            :class="{
              'text-red-500 font-bold text-4xl': entry.rank == 1,
              'text-orange-500 font-bold text-3xl': entry.rank == 2,
              'text-yellow-500 font-bold text-2xl': entry.rank == 3,
              'text-green-500 font-bold': entry.rank > 3 && entry.rank <= 10,
            }"
            class="text-center p-5 w-32"
          >
            #{{ entry.rank }}
          </td>
          <td class="text-left p-5">{{ entry.playerName }}</td>
          <td class="text-left p-5">{{ entry.berries }}</td>
          <td class="text-left p-5">{{ entry.difficulty }}</td>
          <td class="text-left p-5">{{ entry.date }} @ {{ entry.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="w-full flex justify-center items-center gap-5">
              <button
                :disabled="activePage == 1"
                @click="() => activePage--"
                class="disabled:hover:scale-100 disabled:text-neutral-400 hover:scale-150 duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      fill="currentColor"
                      d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z"
                    />
                  </g>
                </svg>
              </button>
              <span class="text-lg font-bold text-white">
                {{ activePage }}
              </span>
              <button
                :disabled="
                  activePage >= Math.ceil(slice(activePage).length / 10)
                "
                @click="() => activePage++"
                class="disabled:hover:scale-100 disabled:text-neutral-400 hover:scale-150 duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      fill="currentColor"
                      d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"
                    />
                  </g>
                </svg>
              </button>
            </div>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "@/store/SettingsStore";

const settingsStore = useSettingsStore();
const activePage = ref(1);
const leaderboard = settingsStore.getLeaderboardByDesc;

const slice = (page) => {
  const start = (page - 1) * 10;
  return leaderboard.slice(start, start + 10);
};
</script>

<style lang="scss" scoped></style>
