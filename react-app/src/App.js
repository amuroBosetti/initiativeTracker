import React, {useEffect, useState} from "react";
import "./styles.css";
import axios from "axios";

const Character = ({character}) => {
    return <p> {`${character.name} : ${character.initiative} - ${character.color}`} </p>;
};

const CharacterList = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/players')
            .then((result) => {
                setCharacters(result.data);
            })
    }, [])

    return (
        <ul>
            {characters.map(character => {
                return <Character character={character}/>
            })}
        </ul>
    )
};

export default function App() {
    return (
        <div>
            <CharacterList/>
        </div>
    );
}
