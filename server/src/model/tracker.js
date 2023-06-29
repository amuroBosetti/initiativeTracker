export class Tracker {
    characters = [];
    currentCharacterIndex = 0;

    addCharacter = (character) => {
        this.characters.push(character);
        this.orderList();
    };

    updateCharacter = (character) => {
        this.characters = this.characters.filter(
            (c) => c.name !== character.name
        );
        this.addCharacter(character);
    };

    orderList() {
        this.characters.sort((a, b) => {
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
        return this.characters[this.currentCharacterIndex];
    };

    nextCharacter = () => {
        return this.characters[this.nextCharacterIndex()];
    };

    moveToNextCharacter() {
        this.currentCharacterIndex = this.nextCharacterIndex();
    }

    moveToPreviousCharacter() {
        if (this.currentCharacterIndex === 0) {
            this.currentCharacterIndex = this.characters.length - 1;
        } else {
            this.currentCharacterIndex--;
        }
    }

    nextCharacterIndex() {
        if (this.currentCharacterIndex === this.characters.length - 1) {
            return 0;
        } else {
            return this.currentCharacterIndex + 1;
        }
    }
}

const tracker = new Tracker();

export default tracker;
