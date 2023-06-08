import pkg from 'johnny-five'
import express from "express";
const { Board, LCD } = pkg;

const board = new Board();

const app = express();


board.on('ready', () => {
    const lcd = new LCD({
        controller: "PCF8574"
    });
    lcd.on()

    app.listen(3000, () => {
        console.log("Listening on port 3000")
    })

    app.get("/", (req, res) => {
        lcd.print("Holis");
        res.send("OK");
    });

    board.repl.inject({
        lcd: lcd
    });
})
