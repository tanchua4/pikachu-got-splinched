import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti'
import "./App.css";
import { render } from "@testing-library/react";

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

  const renderTimer = () => (
    <div className="timer">
      <div>YOU HAVE: </div>
      <div>{timer}</div>
      <div>SECONDS LEFT!!!</div>
    </div>
  );

  const spriteUrl =
    pokemonId &&
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`;

  // Timer state
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (!nameRevealed && pokemonData) {
      setTimer(10000);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setNameRevealed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [pokemonData, nameRevealed]);

  return (
    <div className="App">
      <div className="scrolling-title-container">
        <div className="scrolling-title">
          HARRY, PIKACHU GOT SPLINCHED ( ᗒᗣᗕ )
        </div>
      </div>
      <div className="objective">Hurry! Guess the pokemon or Harry cant find whatever tf is in Hermione's bag!</div>
      {confettiActive && <Confetti gravity={0.4}/>}
      <button className="button" onClick={getNewPokemonClick}>Get Random Pokémon</button>
      {spriteUrl && (
        <div className="pokemon-and-timer">
          <img
            src={spriteUrl}
            alt={`Pokémon ${pokemonId}`}
            draggable="false"
            class="pokemon-img"
          />
        </div>
      )}

      {pokemonData && (
  <div className="pokemon-info-container">
          {!nameRevealed ? (
            <>
              <div
                onClick={() => {setNameRevealed(true); setIsFakeFanClicked(false)}}
                className="are-you-stupid-btn button"
              >
                ARE YOU STUPID?
              </div>
              {renderTimer()}
            </>
          ) : (
            <>
              <h3 className="pokemon-name">{pokemonData.name}</h3>
              {renderTimer()}
            </>
          )}
          <div className="pokemon-actions-container">
            <div className="pokemon-actions-row">
              <button className={!nameRevealed ? 'disable-button' : 'button'} onClick={() => setConfettiActive(true)} disabled={!nameRevealed}>
                LETS GOO
              </button>
              <button className={!nameRevealed ? 'disable-button' : 'button'} disabled={!nameRevealed} onClick={() => setIsFakeFanClicked(true)}>
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