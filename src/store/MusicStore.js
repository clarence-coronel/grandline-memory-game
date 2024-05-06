import { defineStore } from "pinia";

export const useMusicStore = defineStore("MusicStore", {
    state: () => {
        return {
            isMusicPlaying: false,
        }
    },

    actions: {
        toggleMusicPlaying(){
            this.isMusicPlaying = !this.isMusicPlaying
        }
    },

    getters: {
        getMusicStatus(){
            return this.isMusicPlaying
        },
    }
})