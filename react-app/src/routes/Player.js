import React, {useState} from "react";
import axios from "axios";
import {ColorSelector} from "./Admin.js";

export function Player() {
    const [name, setName] = useState('')
    const [initiative, setInitiative] = useState(0)
    const [color, setColor] = useState("RED")
    const [hasBeenEdited, setHasBeenEdited] = useState(false)

    const handleNameChange = (event) => {
        setName(event.target.value)
        setHasBeenEdited(true)
    }

    const handleInitiativeChange = (event) => {
        setInitiative(event.target.value)
        setHasBeenEdited(true)
    }

    const handleColorChange = (event) => {
        setColor(event.target.value)
        setHasBeenEdited(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8000/players', {
            name,
            initiative,
            color
        }).then(() => setHasBeenEdited(false))
    }

    return <div className="player">
        <input className="player-input" type="text" value={name} onChange={handleNameChange}/>
        <input className="player-input" type="number" value={initiative} onChange={handleInitiativeChange}/>
        <ColorSelector color={color} changeColor={handleColorChange}/>
        {hasBeenEdited && <button className="button" onClick={handleSubmit}>Guardar</button>}
    </div>;
}
