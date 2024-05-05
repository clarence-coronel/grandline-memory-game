import axios from 'axios';
import { ref } from 'vue';

export function useFetch(url){
    const isPending = ref(true)

    const getData = async () => {
        try {
            // await new Promise(resolve => setTimeout(resolve, 30000));
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