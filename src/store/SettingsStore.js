import { defineStore } from "pinia";

const getLeaderboard = () => {
  if (!localStorage.getItem("gmo-leaderboard"))
    localStorage.setItem(
      "gmo-leaderboard",
      JSON.stringify({ leaderboard: [] })
    );

  return JSON.parse(localStorage.getItem("gmo-leaderboard")).leaderboard;
};

export const useSettingsStore = defineStore("SettingsStore", {
  state: () => {
    return {
      playerName: "Buggy D. Clown",
      hp: 100, //100, custom
      difficulty: "NORMAL", //EASY, NORMAL, HARD, CUSTOM
      numberOfCards: 10, // 5, 10, custom
      damage: 4,
      leaderboard: getLeaderboard(),
    };
  },

  actions: {
    addEntryToLeaderboard(amount) {
      if (!amount || isNaN(amount)) {
        console.error("setTopScore: invalid argument");
        return;
      }

      const leaderboardArr = JSON.parse(
        localStorage.getItem("gmo-leaderboard")
      ).leaderboard;

      const newEntry = {
        playerName: this.playerName,
        berries: amount,
        difficulty: this.difficulty,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      leaderboardArr.push(newEntry);

      localStorage.setItem(
        "gmo-leaderboard",
        JSON.stringify({ leaderboard: leaderboardArr })
      );

      this.leaderboard = getLeaderboard();

      return newEntry;
    },
    resetLeaderboard() {
      localStorage.setItem(
        "gmo-leaderboard",
        JSON.stringify({ leaderboard: [] })
      );
    },
    setPlayerName(name) {
      this.playerName = name;
    },
    resetPlayerName() {
      this.playerName = "Buggy D. Clown";
    },
    setHp(hp) {
      if (isNaN(hp)) {
        console.error("setHp: invalid argument");
        return;
      }
      this.hp = parseInt(hp);
    },
    resetHp() {
      this.hp = 100;
    },
    setDifficulty(difficulty) {
      if (
        difficulty !== "EASY" &&
        difficulty !== "NORMAL" &&
        difficulty !== "HARD" &&
        difficulty !== "CUSTOM"
      ) {
        console.error("setDifficulty: invalid argument");
        return;
      }
      this.difficulty = difficulty;
    },
    resetDifficulty() {
      this.difficulty = "NORMAL";
    },
    setNumberOfCards(numberOfCards) {
      if (isNaN(numberOfCards)) {
        console.error("setNumberOfCards: invalid argument");
        return;
      }
      this.numberOfCards = parseInt(numberOfCards);
    },
    resetNumberOfCards() {
      this.numberOfCards = 10;
    },
    setDamage(dmg) {
      this.damage = dmg;
    },
  },

  getters: {
    getPlayerName() {
      return this.playerName;
    },
    getHp() {
      return this.hp;
    },
    getDifficulty() {
      return this.difficulty;
    },
    getNumberOfCards() {
      return this.numberOfCards;
    },
    getLeaderboard() {
      return this.leaderboard;
    },
    getDamage() {
      return this.damage;
    },
    getLeaderboardByDesc() {
      return this.leaderboard.sort(
        (a, b) => parseInt(b.berries) - parseInt(a.berries)
      );
    },
  },
});
