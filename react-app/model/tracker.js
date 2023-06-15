export default class Tracker {
    playerList = []

    currentPlayerIndex = 0;

    addPlayer = (player) => {
        this.playerList.push(player)
        this.playerList.sort((a, b) => {
            if (a.initiative > b.initiative) {
                return -1;
            } else if (a.initiative < b.initiative) {
                return 1;
            } else {
                return 0;
            }
        })
    }
    currentPlayer = () => {
        return this.playerList[this.currentPlayerIndex];
    };

    moveToNextPlayer() {
        if (this.currentPlayerIndex === this.playerList.length) {
            this.currentPlayerIndex = 0;
        } else {
            this.currentPlayerIndex++;
        }
    }
    moveToPreviousPlayer() {
        if (this.currentPlayerIndex === 0) {
            this.currentPlayerIndex = this.playerList.length - 1;
        } else {
            this.currentPlayerIndex--;
        }
    }
}
