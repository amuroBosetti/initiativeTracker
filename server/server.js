import bodyParser from "body-parser";
import express from "express";
import pkg from "johnny-five";
import tracker from "./model/tracker.js";
import charactersRouter from "./routers/characters.js";

const { Board, LCD, Button } = pkg;

const board = new Board({ port: "/dev/ttyACM0" });

const app = express();
app.use(bodyParser.json());
app.use("/players", charactersRouter);

const refreshScreen = (lcd, tracker) => {
    lcd.clear();
    const { name, initiative, color } = tracker.currentPlayer();
    lcd.print(`${name}: ${initiative} - ${color}`);
};

board.on("ready", () => {
    const lcd = new LCD({
        controller: "PCF8574",
    });
    const forwardButton = new Button({ pin: 3, isPullup: true });
    const backButton = new Button({ pin: 4, isPullup: true });
    lcd.on();

    app.listen(8000, () => {
        console.log("Listening on port 8000");
    });

    forwardButton.on("press", () => {
        tracker.moveToNextCharacter();
        refreshScreen(lcd, tracker);
    });

    backButton.on("press", () => {
        tracker.moveToPreviousPlayer();
        refreshScreen(lcd, tracker);
    });

    board.repl.inject({
        lcd: lcd,
    });
});
