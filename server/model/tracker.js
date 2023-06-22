class Tracker {
    characterList = [];

    currentPlayerIndex = 0;

    addCharacter = (character) => {
        this.characterList.push(character);
        this.orderList();
    };

    updateCharacter = (character) => {
        this.characterList = this.characterList.filter((c) => c.name !== character.name)
        this.addCharacter(character)
    };

    orderList() {
        this.characterList.sort((a, b) => {
            if (a.initiative > b.initiative) {
                return -1;
            } else if (a.initiative < b.initiative) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    currentCharacter = () => {
        return this.characterList[this.currentPlayerIndex];
    };

    moveToNextPlayer() {
        if (this.currentPlayerIndex === this.characterList.length - 1) {
            this.currentPlayerIndex = 0;
        } else {
            this.currentPlayerIndex++;
        }
    }

    moveToPreviousPlayer() {
        if (this.currentPlayerIndex === 0) {
            this.currentPlayerIndex = this.characterList.length - 1;
        } else {
            this.currentPlayerIndex--;
        }
    }
}

const tracker = new Tracker();
export default tracker;
