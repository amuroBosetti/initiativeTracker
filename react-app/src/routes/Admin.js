import React, {useEffect, useState} from "react";
import axios from "axios";

import {colors} from "../Colors.js";

export const ColorSelector = ({color, changeColor}) => {
    const options = colors.map(c => {
        return <option value={c.value}>{c.displayName}</option>
    });
    return <select value={color} onChange={changeColor}>
        {options}
    </select>
};

const Character = ({character, onSave}) => {
    const [tempCharacter, setTempCharacter] = useState({
        name: character.name,
        initiative: character.initiative,
        color: character.color
    })
    const [hasBeenEdited, setHasBeenEdited] = useState(false)

    useEffect(() => {
        setTempCharacter(character)
    }, [character])

    const updateTempCharacter = ({name = character.name, initiative = character.initiative, color = character.color}) => {
        setTempCharacter({
            name,
            initiative,
            color
        })
        setHasBeenEdited(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.put('http://localhost:8000/players', {
            ...tempCharacter
        }).then(() => onSave())
    }

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:8000/players/${character.name}`)
            .then(() => {
                onSave()
            })
    }

    return <div className="character">
        <input type="text" value={tempCharacter.name} onChange={(event) => updateTempCharacter({name: event.target.value})}/>
        <input type="number" value={tempCharacter.initiative} onChange={(event) => updateTempCharacter({initiative: event.target.value})}/>
        <ColorSelector color={tempCharacter.color} changeColor={(event) => updateTempCharacter({color: event.target.value})}/>
        {hasBeenEdited && <button className="button" onClick={handleSubmit}>Guardar</button>}
        <button className="button" onClick={handleDelete}>Borrar</button>
    </div>;
};
const CharacterList = () => {
    const [characters, setCharacters] = useState([])

    const fetchCharacters = () => {
        axios.get('http://localhost:8000/players')
            .then((result) => {
                setCharacters(result.data);
            })
    };

    useEffect(() => {
        fetchCharacters();
    }, [])

    return (<ul className="character-table">
        {characters.map(character => {
            return <li key={character.name}><Character character={character} onSave={fetchCharacters}/></li>
        })}
        <CharacterAdder onSave={fetchCharacters}/>
    </ul>)
};

const CharacterAdder = ({onSave}) => {
    const emptyCharacter = {
        name: '',
        initiative: 0,
        color: "RED"
    };

    const [character, setCharacter] = useState(emptyCharacter)
    const [hasBeenEdited, setHasBeenEdited] = useState(false)

    const updateCharacter = ({name = character.name, initiative = character.initiative, color = character.color}) => {
        setCharacter({
            name,
            initiative,
            color
        })
        setHasBeenEdited(true)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8000/players', {
            ...character
        }).then(() => {
            setHasBeenEdited(false);
            setCharacter(emptyCharacter)
            onSave()
        })
    }
    return <div style={{display: 'flex'}}>
        <input className="player-input" type="text" value={character.name} onChange={(event) => updateCharacter({name: event.target.value})}/>
        <input className="player-input" type="number" value={character.initiative} onChange={(event) => updateCharacter({initiative: event.target.valueAsNumber})}/>
        <ColorSelector color={character.color} changeColor={(event) => updateCharacter({color: event.target.value})}/>
        {hasBeenEdited && <button className="button" onClick={handleSubmit}>Guardar</button>}
    </div>
};

export const Admin = () => {
    return <div style={{backgroundColor: 'red'}}>
        <CharacterList/>
    </div>
};
