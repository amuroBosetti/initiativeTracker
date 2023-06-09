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

    const nextTurnRGB = new Led.RGB({
        pins: {
            red: 9,
            green: 10,
            blue: 11
        },
        isAnode: true
    });

    const {name, initiative, color} = req.body;
    tracker.addCharacter({name, initiative: parseInt(initiative), color});
    refreshDashboard(lcd, currentTurnRGB, nextTurnRGB, tracker);

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

    const nextTurnRGB = new Led.RGB({
        pins: {
            red: 9,
            green: 10,
            blue: 11
        },
        isAnode: true
    });

    const {name, initiative, color} = req.body;
    tracker.updateCharacter({name, initiative: parseInt(initiative), color});
    refreshDashboard(lcd, currentTurnRGB, nextTurnRGB, tracker);

    res.status(200);
    res.send();
});

charactersRouter.delete('/:name', (req, res) => {
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

    const nextTurnRGB = new Led.RGB({
        pins: {
            red: 9,
            green: 10,
            blue: 11
        },
        isAnode: true
    });

    tracker.removeCharacter(req.params.name);
    refreshDashboard(lcd, currentTurnRGB, nextTurnRGB, tracker);

    res.status(200);
    res.send();
})

export default charactersRouter;
