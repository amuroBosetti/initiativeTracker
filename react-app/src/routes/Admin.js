import React, {useEffect, useState} from "react";
import axios from "axios";


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
            name,
            initiative,
            color
        }).then(() => setHasBeenEdited(false))
    }

    return <div className="character">
        <input type="text" value={name} onChange={handleNameChange}/>
        <input type="number" value={initiative} onChange={handleInitiativeChange}/>
        <select value={color} onChange={handleColorChange}>
            <option value="RED">ROJO</option>
            <option value="GREEN">VERDE</option>
            <option value="BLUE">AZUL</option>
        </select>
        {hasBeenEdited && <button className="button" onClick={handleSubmit}>Guardar</button>}
    </div>;
};
const CharacterList = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/players')
            .then((result) => {
                setCharacters(result.data);
            })
    }, [])

    return (<ul className="character-table">
            {characters.map(character => {
                return <Character character={character}/>
            })}
        </ul>)
};
export const Admin = () => (
    <div>
        <CharacterList/>
    </div>);  

  


