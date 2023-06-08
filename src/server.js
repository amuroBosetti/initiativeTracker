import pkg from 'johnny-five'
import express from "express";
import bodyParser from "body-parser";

const { Board, LCD } = pkg;

const board = new Board();

const app = express();
app.use(bodyParser.json())

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
        res.status(200)
        res.send();
    });

    app.post("/users", (req, res) => {
        const { name, color, initiative } = req.body;
        lcd.print(`${name}: ${initiative} - ${color}`);
        res.status(200)
        res.send();
    });

    board.repl.inject({
        lcd: lcd
    });
})
