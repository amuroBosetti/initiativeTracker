import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import pkg from "johnny-five";
import tracker from "./model/tracker.js";
import charactersRouter from "./routers/characters.js";
import refreshDashboard from "./dashboard.js";

const {Board, LCD, Button, Led} = pkg;

const board = new Board();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/players", charactersRouter);

board.on("ready", () => {
    const lcd = new LCD({
        controller: "PCF8574",
    });
    lcd.on();

    const currentTurnRGB = new Led.RGB({
        pins: {
            red: 3,
            green: 5,
            blue: 6
        },
        isAnode: true
    });
    currentTurnRGB.on()

    const forwardButton = new Button({pin: 2, isPullup: true});
    const backButton = new Button({pin: 4, isPullup: true});

    forwardButton.on("press", () => {
        tracker.moveToNextCharacter();
        refreshDashboard(lcd, currentTurnRGB, tracker);
    });

    backButton.on("press", () => {
        tracker.moveToPreviousCharacter();
        refreshDashboard(lcd, currentTurnRGB, tracker);
    });

    app.listen(8000, () => {
        console.log("Listening on port 8000");
    });
});
