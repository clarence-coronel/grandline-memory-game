import { defineStore } from "pinia";

const getTopScore = () => {
    try {
        const topScore = JSON.parse(localStorage.getItem('topScore'))
        return topScore
    } catch (error) {
        return null
    }
}

export const useSettingsStore = defineStore("SettingsStore", {
    state: () => {
        return {
            playerName: "Buggy D. Clown",
            hp: 100, //100, custom
            difficulty: 'NORMAL', //EASY, NORMAL, HARD, CUSTOM
            numberOfCards: 10, // 5, 10, custom
            topScore: getTopScore(), //retrieved from local storage
            lastRoundScore: null,
            damage: 3
        }
    },

    actions: {
        hardResetGame(){
            localStorage.setItem('topScore', null)

            this.playerName = "Buggy D. Clown"
            this.hp = 100
            this.difficulty = "NORMAL"
            this.numberOfCards = 10
            this.highestBerries = getTopScore()
            this.lastRoundScore = null
            this.damage = 10
        },
        softResetGame(){
            this.playerName = "Buggy D. Clown"
            this.hp = 100
            this.difficulty = "NORMAL"
            this.numberOfCards = 10
            this.damage = 10
        },
        setTopScore(amount, time){
            if(!amount || isNaN(amount) || !time || isNaN(time)) {
                console.error("setTopScore: invalid argument")
                return
            }

            localStorage.setItem('topScore', JSON.stringify({playerName: this.playerName, berries: amount, time: time + 's'}))
            this.highestBerries = getTopScore()
        },
        resetTopScore(){
            localStorage.setItem('topScore', null)
        },
        setPlayerName(name){
            this.playerName = name
        },
        resetPlayerName(){
            this.playerName = "Buggy D. Clown"
        },
        setHp(hp){
            if(isNaN(hp)) {
                console.error("setHp: invalid argument")
                return
            }
            this.hp = parseInt(hp)
        },
        resetHp(){
            this.hp = 100
        },
        setDifficulty(difficulty){
            if(difficulty !== "EASY" && difficulty !== "NORMAL" && difficulty !== "HARD" && difficulty !== "CUSTOM"){
                console.error("setDifficulty: invalid argument")
                return
            }
            this.difficulty = difficulty
        },
        resetDifficulty(){
            this.difficulty = "NORMAL"
        },
        setNumberOfCards(numberOfCards){
            if(isNaN(numberOfCards)) {
                console.error("setNumberOfCards: invalid argument")
                return
            }
            this.numberOfCards = parseInt(numberOfCards)
        },
        resetNumberOfCards(){
            this.numberOfCards = 10
        },
        setLastRoundScore(amount, time){
            if(!amount || isNaN(amount) || !time || isNaN(time)) {
                console.error("setLastRoundScore: invalid argument")
                return
            }

            this.lastRoundScore = {playerName: this.playerName, berries: amount, time: time + 's'}
        },
        setDamage(dmg){
            this.damage = dmg
        }
    },

    getters: {
        getPlayerName() {
            return this.playerName
        },
        getHp() {
            return this.hp
        },
        getDifficulty() {
            return this.difficulty
        },
        getNumberOfCards() {
            return this.numberOfCards
        },
        getTopScore() {
            return this.topScore
        },
        getLastRoundScore() {
            return this.lastRoundScore
        },
        getDamage() {
            return this.damage
        }
    }
})

