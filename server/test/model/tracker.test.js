import tracker from "../../model/tracker.js";

const resetTracker = () => {
    tracker.characterList = []
    tracker.currentPlayerIndex = 0
};

describe('Tracker', () => {

    test('when a new player is added to an empty tracker, then that player is the current one', () => {
        tracker.characterList = []
        const player = {name: "Juan", initiative: 15, color: "Red"}

        tracker.addCharacter(player);

        expect(tracker.currentCharacter()).toEqual(player)
    });

    describe('with a tracker which already has a player', () => {
        let player;
        beforeEach(() => {
            resetTracker();
            player = {name: "Juan", initiative: 15, color: "Red"}
            tracker.addCharacter(player)
        })

        test('when a new player with less initiative is added, then the old player is the current one', () => {
            const playerWithLessInitiative = {name: "Santi", initiative: 10, color: "Green"}

            tracker.addCharacter(playerWithLessInitiative);

            expect(tracker.currentCharacter()).toEqual(player)
        });

        test('when a new player with more initiative is added, then the new player is the current one', () => {
            const playerWithMoreInitiative = {name: "Laucha", initiative: 20, color: "Green"}

            tracker.addCharacter(playerWithMoreInitiative);

            expect(tracker.currentCharacter()).toEqual(playerWithMoreInitiative)
        });

        test('when that player is updated, then the player data is the provided', () => {
            const newInitiative = 20;
            const newColor = "Green";
            const newData = {name: player.name, initiative: newInitiative, color: newColor}

            tracker.updateCharacter(newData);

            expect(tracker.currentCharacter()).toEqual(newData)
        });
    });

    describe('with a tracker which already has three players', () => {
        const firstPlayer = {name: "Juan", initiative: 20, color: "Red"}
        const secondPlayer = {name: "Marcos", initiative: 15, color: "Green"}
        const thirdPlayer = {name: "Belu", initiative: 10, color: "Pink"}

        beforeEach(() => {
            tracker.characterList = []
            tracker.currentPlayerIndex = 0
            tracker.addCharacter(firstPlayer)
            tracker.addCharacter(secondPlayer)
            tracker.addCharacter(thirdPlayer)
        })

        test('when the curren players turn is passed, then it is the turn of the current player', () => {
            tracker.moveToNextPlayer()

            expect(tracker.currentCharacter()).toEqual(secondPlayer)
        })

        test('when the curren players is the last one, and the turn is passed, then it is the turn of the first player', () => {
            tracker.moveToNextPlayer()
            tracker.moveToNextPlayer()

            tracker.moveToNextPlayer()

            expect(tracker.currentCharacter()).toEqual(firstPlayer)
        })

        test('when the current player is the first one, and the turn is passed backwards, then it is the turn of the last player', () => {
            tracker.moveToPreviousPlayer()

            expect(tracker.currentCharacter()).toEqual(thirdPlayer)
        })

        test('when the current player is updated with less initiative than the next one, then the current player is the next one', () => {
            tracker.updateCharacter({name: firstPlayer.name, initiative: secondPlayer.initiative - 1, color: firstPlayer.color})

            expect(tracker.currentCharacter()).toEqual(secondPlayer)
        })
    })
});
