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
        },
        setMusicPlaying(val){
            this.isMusicPlaying = val
        }
    },

    getters: {
        getMusicStatus(){
            return this.isMusicPlaying
        },
    }
})