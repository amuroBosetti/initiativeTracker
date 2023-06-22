import { Router } from "express";
import pkg from "johnny-five";
import tracker from "../model/tracker.js";
import refreshScreen from "../screen.js";
const { LCD } = pkg;

const charactersRouter = Router();

charactersRouter.get("/", (req, res) => {
    res.header("Content-Type", "application/json");
    res.status(200);
    res.send(tracker.characters);
});

charactersRouter.post("/", (req, res) => {
    const lcd = new LCD({
        controller: "PCF8574",
    });

    tracker.addCharacter(req.body);
    refreshScreen(lcd, tracker);

    res.status(200);
    res.send();
});

export default charactersRouter;
