import bodyParser from "body-parser";
import express from "express";
import pkg from "johnny-five";
import tracker from "./model/tracker.js";
import charactersRouter from "./routers/characters.js";
import refreshScreen from "./screen.js";

const { Board, LCD, Button } = pkg;

const board = new Board();

const app = express();
app.use(bodyParser.json());
app.use("/players", charactersRouter);

board.on("ready", () => {
    const lcd = new LCD({
        controller: "PCF8574",
    });
    lcd.on();

    const forwardButton = new Button({ pin: 3, isPullup: true });
    const backButton = new Button({ pin: 4, isPullup: true });

    forwardButton.on("press", () => {
        tracker.moveToNextCharacter();
        refreshScreen(lcd, tracker);
    });

    backButton.on("press", () => {
        tracker.moveToPreviousPlayer();
        refreshScreen(lcd, tracker);
    });

    app.listen(8000, () => {
        console.log("Listening on port 8000");
    });
});
