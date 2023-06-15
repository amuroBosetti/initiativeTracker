import Tracker from "../../model/tracker.js";

describe('Tracker', () => {

    test('when a new player is added to an empty tracker, then that player is the current one', () => {
        const tracker = new Tracker();
        const player = {name: "Juan", initiative: 15, color: "Red"}

        tracker.addPlayer(player);

        expect(tracker.currentPlayer()).toEqual(player)
    });

    describe('with a tracker which already has a player', () => {
        const tracker = new Tracker();
        const player = {name: "Juan", initiative: 15, color: "Red"}
        tracker.addPlayer(player)

        test('when a new player with less initiative is added, then the old player is the current one', () => {
            const playerWithLessInitiative = {name: "Santi", initiative: 10, color: "Green"}

            tracker.addPlayer(playerWithLessInitiative);

            expect(tracker.currentPlayer()).toEqual(player)
        });

        test('when a new player with more initiative is added, then the new player is the current one', () => {
            const playerWithMoreInitiative = {name: "Laucha", initiative: 20, color: "Green"}

            tracker.addPlayer(playerWithMoreInitiative);

            expect(tracker.currentPlayer()).toEqual(playerWithMoreInitiative)
        });
    });

    describe('with a tracker which already has three players', () => {
        const tracker = new Tracker();
        const firstPlayer = {name: "Juan", initiative: 20, color: "Red"}
        const secondPlayer = {name: "Marcos", initiative: 15, color: "Green"}
        const thirdPlayer = {name: "Belu", initiative: 10, color: "Pink"}
        tracker.addPlayer(firstPlayer)
        tracker.addPlayer(secondPlayer)
        tracker.addPlayer(thirdPlayer)

        test('when the curren players turn is passed, then it is the turn of the current player', () => {
            tracker.moveToNextPlayer()

            expect(tracker.currentPlayer()).toEqual(secondPlayer)
        })

        test('when the curren players is the last one, and the turn is passed, then it is the turn of the first player', () => {
            tracker.moveToNextPlayer()
            tracker.moveToNextPlayer()

            tracker.moveToNextPlayer()

            expect(tracker.currentPlayer()).toEqual(firstPlayer)
        })

        test('when the current player is the first one, and the turn is passed backwards, then it is the turn of the last player', () => {
            tracker.moveToPreviousPlayer()

            expect(tracker.currentPlayer()).toEqual(thirdPlayer)
        })
    })
});
