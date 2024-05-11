import { defineStore } from "pinia";
import { useFetch } from "@/composables/useFetch";

export const useCharacterStore = defineStore("CharacterStore", {
    state: () => {
        return {
            data: null,
            characters: null,
            limit: null,
            isPending: false
        }
    },

    actions: {
        async loadCharacters(){
            this.isPending = true 

            const { getData } = useFetch(process.env.VUE_APP_CHAR_API_URL)

            const response = await getData()

            this.characters = response.data

            this.isPending = false
        },
        setLimit(newLimit){
            this.limit = newLimit
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        shuffleArray(array) {
            // Create a copy of the original array to avoid modifying the original array
            const shuffledArray = array.slice();
            
            // Fisher-Yates shuffle algorithm
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            
            return shuffledArray;
        },
        sliceArray(array, limit) {
            // Ensure the limit is within the bounds of the array
            const endIndex = Math.min(limit, array.length);
            
            // Return a new array sliced up to the specified limit
            return array.slice(0, endIndex);
        }
    },
    getters: {
        getRawCharacters(){
            if(!this.characters) return []
            return this.characters
        },
        getCharactersGameReady() {
            if(!this.characters) return []
            
            let readyChar = []

            const randomCharacters = this.sliceArray(this.shuffleArray(this.characters), this.limit).map((data, index) => {
                return { id: index, name: data.character.name, imageUrl: data.character.images.jpg.image_url}
            })

            readyChar = this.shuffleArray([...randomCharacters, ...randomCharacters])

            return readyChar
        },
        getIsPending(){
            return this.isPending
        },
        getData(){
            return this.data
        }
    }
})