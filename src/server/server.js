import pkg from 'johnny-five'
import express from "express";
import bodyParser from "body-parser";
import {Tracker} from "../model/tracker.js";

const { Board, LCD } = pkg;

const board = new Board();

const app = express();
app.use(bodyParser.json())

board.on('ready', () => {
    const tracker = new Tracker()
    const lcd = new LCD({
        controller: "PCF8574"
    });
    lcd.on()

    app.listen(3000, () => {
        console.log("Listening on port 3000")
    })

    app.get("/", (req, res) => {
        lcd.print("Holis");
        res.status(200)
        res.send();
    });

    app.post("/players", (req, res) => {
        lcd.clear()
        tracker.addPlayer(req.body);
        const {name, initiative, color} = tracker.currentPlayer();
        lcd.print(`${name}: ${initiative} - ${color}`);
        res.status(200)
        res.send();
    });

    board.repl.inject({
        lcd: lcd
    });
})
