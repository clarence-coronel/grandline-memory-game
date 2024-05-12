import axios from 'axios';
import { ref } from 'vue';
import { useCharacterStore } from '@/store/CharacterStore';

export function useFetch(url){
    const characterStore = useCharacterStore()
    const isPending = ref(characterStore.getData ? false : true)
    
    const getData = async () => {

        if(characterStore.getData) return characterStore.getData


        try {
            // await new Promise(resolve => setTimeout(resolve, 3000));
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.error("Error fetching data: " + error)
            return null
        } finally {
            isPending.value = false
        }
    }

    return { 
        getData,
        isPending
    }
}