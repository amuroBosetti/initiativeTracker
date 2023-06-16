class Tracker {
    characters = [];
    currentPlayerIndex = 0;

    addPlayer = (player) => {
        this.characters.push(player);
        this.characters.sort((a, b) => {
            if (a.initiative > b.initiative) {
                return -1;
            } else if (a.initiative < b.initiative) {
                return 1;
            } else {
                return 0;
            }
        });
    };

    currentPlayer = () => {
        return this.characters[this.currentPlayerIndex];
    };

    moveToNextPlayer() {
        if (this.currentPlayerIndex === this.characters.length - 1) {
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

const tracker = new Tracker();

export default tracker;
