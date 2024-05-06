import { defineStore } from "pinia";

export const useGameStore = defineStore("GameStore", {
    state: () => {
        return {
            hp: null,
            berries: null,
            time: null,
            cardsLeft: null,
            firstCard: null,
            secondCard: null,
            isGameReady: false
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
            if((this.firstCard && this.secondCard) && (this.firstCard === this.secondCard)) {
                this.reduceCardsLeft()
                return true
            }
            return false
        },
        toggleGameStatus() {
            this.isGameReady = !this.isGameReady
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
        }
    }
})