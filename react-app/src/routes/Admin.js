import React, {useEffect, useState} from "react";
import axios from "axios";

import {colors} from "../Colors.js";
import {Player} from "./Player.js";


export const ColorSelector = ({color, changeColor}) => {
    const options = colors.map(c => {
        return <option value={c.value}>{c.displayName}</option>
    });
    return <select value={color} onChange={changeColor}>
        {options}
    </select>
};

const Character = ({character}) => {
    const [name, setName] = useState(character.name)
    const [initiative, setInitiative] = useState(character.initiative)
    const [color, setColor] = useState(character.color)

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
        axios.put('http://localhost:8000/players', {
            name, initiative, color
        }).then(() => setHasBeenEdited(false))
    }

    return <div className="character">
        <input type="text" value={name} onChange={handleNameChange}/>
        <input type="number" value={initiative} onChange={handleInitiativeChange}/>
        <ColorSelector color={color} changeColor={handleColorChange}/>
        {hasBeenEdited && <button className="button" onClick={handleSubmit}>Guardar</button>}
    </div>;
};
const CharacterList = () => {
    const [characters, setCharacters] = useState([])
    const [createFlag, setCreateFlag] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/players')
            .then((result) => {
                setCharacters(result.data);
                setCreateFlag(false)
            })
    }, [createFlag])

    return (<ul className="character-table">
        {characters.map(character => {
            return <Character character={character}/>
        })}
        <CharacterAdder setCreateFlag={setCreateFlag}/>
    </ul>)
};

const CharacterAdder = ({setCreateFlag}) => {
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
        }).then(() => {
            setHasBeenEdited(false);
            setCreateFlag(true)
        })
    }
    return <div style={{display: 'flex'}}>
        <input className="player-input" type="text" value={name} onChange={handleNameChange}/>
        <input className="player-input" type="number" value={initiative} onChange={handleInitiativeChange}/>
        <ColorSelector color={color} changeColor={handleColorChange}/>
        {hasBeenEdited && <button className="button" onClick={handleSubmit}>Guardar</button>}
    </div>
};

export const Admin = () => {
    return <div style={{backgroundColor: 'red'}}>
        <CharacterList/>
    </div>
};




