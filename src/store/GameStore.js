import { defineStore } from "pinia";

export const useGameStore = defineStore("GameStore", {
    state: () => {
        return {
            hp: null,
            berries: 0,
            time: 0,
            cardsLeft: null,
            firstCard: null,
            secondCard: null,
            isGameReady: false,
            closeAllCards: false,
            streak: 1
        }
    },

    actions: {
        setHp(amount){
            this.hp = amount
        },
        inflictDamage(dmg){
            this.hp-=dmg
        },
        setBerries(newBerries){
            this.berries = newBerries
        },
        addBerries(amount){
            this.berries+=amount
        },
        setTime(newTime){
            this.time = newTime
        },
        setCardsLeft(newCardsLeft){
            this.cardsLeft = newCardsLeft
        },
        reduceCardsLeft(){
            this.cardsLeft-=1
        },
        updateFirstCard(id = null){
            this.firstCard = id
        },
        updateSecondCard(id = null){
            this.secondCard = id
        },
        validateSelectedCards(){
            if((this.firstCard && this.secondCard) && (this.firstCard.id === this.secondCard.id)) {
                this.reduceCardsLeft()
                return true
            }
            return false
        },
        toggleGameStatus() {
            this.isGameReady = !this.isGameReady
        },
        evaluateGameStatus() {
            if(this.getCardsLeft == 0){
                console.log("You win")
                this.resetStreak()
                this.toggleGameStatus()
                return true
            }
            else if (this.getHp <= 0){
                console.log("You lose")
                this.resetStreak()
                this.toggleGameStatus()
                return false
            }
        },
        incrementStreak() {
            this.streak+=1
        },
        resetStreak(){
            this.streak = 1
        }
    },

    getters: {
        getHp(){
            return this.hp
        },
        getBerries(){
            return this.berries
        },
        getTime() {
            return this.time
        },
        getCardsLeft() {
            return this.cardsLeft
        },
        getFirstCard(){
            return this.firstCard
        },
        getSecondCard(){
            return this.secondCard
        },
        getGameStatus(){
            return this.isGameReady
        },
        getStreak(){
            return this.streak
        }
    }
})