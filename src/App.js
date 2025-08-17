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
    // State for fake fan overlay
  const [showFail, setShowFail] = useState(false);

  // Array of media URLs for FAKE FAN overlay
  const fakeFanMedia = [
    "https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUycjJxYTUwZW1hNjhrbGFvaXFqOXNwcjg3dDVmdDhmdGE2bGp4bzM0YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT77XWum9yH7zNkFW0/giphy-downsized-medium.gif",
    "https://i.pinimg.com/originals/49/6d/c7/496dc7f3371d10d07bb94e101fde11c7.gif",
    "https://impeccabletablemanners.files.wordpress.com/2016/05/monkey-puppet-omg-shock-gif.gif",
    "https://www.youtube.com/embed/IxX_QHay02M?si=7QB84C4z72TC3DDA&amp;start=28",
  ];

  // State for selected media
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Handler to close overlay
  const closeFakeFanOverlay = () => setShowFail(false);

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
      <button className="prompt-button button" onClick={getNewPokemonClick}>Get Random Pokémon</button>
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
                onClick={() => {setNameRevealed(true)}}
                className="are-you-stupid-btn prompt-button button"
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
              <button className={!nameRevealed ? 'disable-button button' : 'enable-button button'} onClick={() => setConfettiActive(true)} disabled={!nameRevealed}>
                LETS GOO
              </button>
              <button
                className={!nameRevealed ? 'disable-button button' : 'enable-button button'}
                disabled={!nameRevealed}
                onClick={() => {
                  const idx = Math.floor(Math.random() * fakeFanMedia.length);
                  setSelectedMedia(fakeFanMedia[idx]);
                  setShowFail(true);
                }}
              >
                FAKE FAN
              </button>
            </div>
          </div>
        </div>
      )}
      {showFail && selectedMedia && (
          <div className="fake-fan-overlay" onClick={closeFakeFanOverlay}>
            {selectedMedia.includes('youtube.com/embed') ? (
              <iframe
                className="fake-fan-img"
                src={selectedMedia}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : selectedMedia.endsWith('.mp4') ? (
              <video src={selectedMedia} className="fake-fan-img" autoPlay loop muted />
            ) : (
              <img src={selectedMedia} alt="Fake Fan" className="fake-fan-img" />
            )}
          </div>
        )}
    </div>
  );
}

export default App;