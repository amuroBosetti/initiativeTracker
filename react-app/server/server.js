import bodyParser from "body-parser";
import express from "express";
import pkg from "johnny-five";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import tracker from "./model/tracker.js";
import charactersRouter from "./routes/characters.js";

const { Board, LCD, Button } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const board = new Board({ port: "/dev/ttyACM0" });

const app = express();
app.use(bodyParser.json());
app.use("/characters", charactersRouter);

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

    app.use(express.static(path.join(__dirname, "..", "build")));
    app.use(express.static("public"));

    app.listen(8000, () => {
        console.log("Listening on port 8000");
    });

    app.get("/admin", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "build", "index.html"));
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
