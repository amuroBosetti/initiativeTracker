import { Router } from "express";
import pkg from "johnny-five";
import tracker from "../model/tracker.js";
import refreshDashboard from "../dashboard.js";
const { LCD, Led } = pkg;

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
    const currentTurnRGB = new Led.RGB({
        pins: {
            red: 3,
            green: 5,
            blue: 6
        },
        isAnode: true
    });

    tracker.addCharacter(req.body);
    refreshDashboard(lcd, currentTurnRGB, tracker);

    res.status(200);
    res.send();
});

charactersRouter.put("/", (req, res) => {
    const lcd = new LCD({
        controller: "PCF8574",
    });
    const currentTurnRGB = new Led.RGB({
        pins: {
            red: 3,
            green: 5,
            blue: 6
        },
        isAnode: true
    });

    tracker.updateCharacter(req.body);
    refreshDashboard(lcd, currentTurnRGB, tracker);

    res.status(200);
    res.send();
});

export default charactersRouter;
