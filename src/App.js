import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti'
import "./App.css";

function fetchAPI(param) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${param}`)
    .then((response) => response.json())
    .then((data) => data);
}

function App() {
  const [pokemonId, setPokemonId] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [nameRevealed, setNameRevealed] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [isFakeFanClicked, setIsFakeFanClicked] = useState(false);

  const getRandomId = () => Math.floor(Math.random() * 100) + 1;

  useEffect(() => {
    const id = getRandomId();
    setPokemonId(id);
    fetchAPI(id).then((data) => {
      setPokemonData(data);
      setNameRevealed(false);
    });
  }, []);

  const getNewPokemonClick = () => {
    const id = getRandomId();
    setPokemonId(id);
    fetchAPI(id).then((data) => {
      setPokemonData(data);
      setNameRevealed(false);
    });
    setConfettiActive(false);
  };

  const spriteUrl =
    pokemonId &&
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div className="App">
      <div className="scrolling-title-container">
        <div className="scrolling-title">
          HARRY, PIKACHU GOT SPLINCHED ( ᗒᗣᗕ )
        </div>
      </div>
      <div className="objective">Hurry! Guess the pokemon or Harry cant find whatever tf is in Hermione's bag!</div>
      {confettiActive && <Confetti gravity={0.4}/>}
      <button onClick={getNewPokemonClick}>Get Random Pokémon</button>
      {spriteUrl && (
        <div>
          <img
            src={spriteUrl}
            alt={`Pokémon ${pokemonId}`}
            draggable="false"
            style={{ width: 150 }}
          />
        </div>
      )}

      {pokemonData && (
        <div style={{ marginTop: "10px" }}>
          {nameRevealed ? (
            <h3 style={{ textTransform: "capitalize" }}>{pokemonData.name}</h3>
          ) : (
            <div
              onClick={() => {setNameRevealed(true); setIsFakeFanClicked(false)}}
              style={{
                width: "150px",
                padding: "10px",
                backgroundColor: "#ccc",
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "5px",
              }}
            >
              ARE YOU STUPID?
            </div>
          )}
          <div style={{ marginTop: "10px" }}>
         
          <div style={{display: "flex", gap:"20px"}}>
          <button onClick={() => setConfettiActive(true)} disabled={!nameRevealed}>LETS GOO</button>
          <button disabled={!nameRevealed} onClick={() => setIsFakeFanClicked(true)}>
            {isFakeFanClicked && nameRevealed ? "🎂" : "FAKE FAN"}
          </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;