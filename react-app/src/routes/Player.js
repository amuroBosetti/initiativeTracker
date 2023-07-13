import axios from "axios";
import React, { useState } from "react";
import { PLAYERS_API } from "../Constants.js";
import { ColorSelector } from "./Admin.js";
import DnDLogo from "./components/images/d&d.jpg";

export const Player = () => {
    const [name, setName] = useState("");
    const [initiative, setInitiative] = useState(0);
    const [color, setColor] = useState("RED");
    const [hasBeenEdited, setHasBeenEdited] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setHasBeenEdited(true);
    };

    const handleInitiativeChange = (event) => {
        setInitiative(event.target.value);
        setHasBeenEdited(true);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
        setHasBeenEdited(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(PLAYERS_API, {
                name,
                initiative,
                color,
            })
            .then(() => setHasBeenEdited(false));
    };

    return (
        <div className="container">
            <div className="player">
                <label htmlFor="nameInput">Nombre</label>
                <input
                    className="player-input"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Introduce tu nombre o apodo"
                />
                <label htmlFor="nameInput">Iniciativa</label>
                <input
                    className="player-input"
                    type="number"
                    value={initiative}
                    onChange={handleInitiativeChange}
                />
                <label htmlFor="nameInput">Color</label>
                <ColorSelector color={color} changeColor={handleColorChange} />
                {hasBeenEdited && (
                    <button className="button" onClick={handleSubmit}>
                        Listo
                    </button>
                )}
            </div>
            <section className="section-imagem">
                <img src={DnDLogo} alt="Dungeons & Dragons" />
            </section>
        </div>
    );
};
