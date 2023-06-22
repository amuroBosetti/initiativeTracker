import pkg from 'johnny-five'
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {dirname} from "path";
import {fileURLToPath} from 'url';
import tracker from "./model/tracker.js";

const {Board, LCD, Button} = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const board = new Board();

const app = express();
app.use(bodyParser.json())

const refreshScreen = (lcd, tracker) => {
    lcd.clear()
    const {name, initiative, color} = tracker.currentPlayer();
    lcd.print(`${name}: ${initiative} - ${color}`);
};

board.on('ready', () => {
    const lcd = new LCD({
        controller: "PCF8574"
    });
    const forwardButton = new Button({pin: 3, isPullup: true})
    const backButton = new Button({pin: 4, isPullup: true})
    lcd.on()

    app.use(express.static(path.join(__dirname, "..", "build")));
    app.use(express.static("public"));

    app.listen(8000, () => {
        console.log("Listening on port 8000")
    })

    app.get("/", (req, res) => {
        lcd.print("Holis");
        res.status(200)
        res.send();
    });

    app.post("/players", (req, res) => {
        tracker.addCharacter(req.body);
        refreshScreen(lcd, tracker);
        res.status(200)
        res.send();
    });

    app.put("/players", (req, res) => {
        tracker.updateCharacter(req.body);
        refreshScreen(lcd, tracker);
        res.status(200)
        res.send();
    });

    app.get("/players", (req, res) => {
        res.header("Content-Type", "application/json")
        res.send(tracker.characterList)
    })

    forwardButton.on("press", () => {
        tracker.moveToNextPlayer()
        refreshScreen(lcd, tracker)
    })

    backButton.on("press", () => {
        tracker.moveToPreviousPlayer()
        refreshScreen(lcd, tracker)
    })

    board.repl.inject({
        lcd: lcd
    });
})
