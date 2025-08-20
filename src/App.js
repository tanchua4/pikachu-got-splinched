import { useState, useEffect } from "react";
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
  const [showFail, setShowFail] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [fakeFanDisabled, setFakeFanDisabled] = useState(false);
  const [letsGooDisabled, setLetsGooDisabled] = useState(false);

  const letsGooMedia = [
    "https://imgix.bustle.com/uploads/image/2023/6/1/bf7920f9-57f7-4e46-8178-c01670735df8-hayley-photo-by-julia-cox.jpg?w=374&h=285&fit=crop&crop=focalpoint&dpr=2&fp-x=0.516&fp-y=0.2347",
    "/media/Brenda.jpg",
    "/media/Cussing.png",
    "https://www.youtube.com/embed/6cEidQxoXCw?si=y8W0QYNHpBgPY-i6",
    "https://cdn.shopify.com/s/files/1/0613/0437/3481/articles/Ikura_sushi.jpg?v=1683722823",
    "https://i.pinimg.com/originals/99/3c/50/993c50282188d047a89bcb30de3d70fe.gif",
    "https://i.pinimg.com/originals/a2/b6/fe/a2b6fe0d7cdd2f1acf495cd57d3ba279.gif",
    "/media/Jeff.jpg",
    "https://media.tenor.com/vUE_peSWrrwAAAAM/pikahappy.gif",
    "/media/Pantree.png"
  ]

  const fakeFanMedia = [
    "https://www.youtube.com/embed/plhFUXDqvaw?si=ixLFIedBv1_cs9bZ&amp;start=178",
    "https://www.youtube.com/embed/jfr1Fzq2kUg?si=tjlJSxnASHqJkfOY",
    "https://media.tenor.com/yB8qR6yw8p0AAAAM/pikaded.gif",
    "https://www.bmisurgery.com/wp-content/uploads/2017/05/shutterstock_688185661-1024x717.jpg",
    "https://sugarandsparrow.s3.us-west-2.amazonaws.com/flour/wp-content/uploads/2022/02/16214527/Best-Vanilla-Cake-Recipe-6.jpeg",
    "https://www.youtube.com/embed/d522g3iHy1w?si=65tK-d_cG9F7mtDs",
    "https://www.youtube.com/embed/aKuAtXKgDEA?si=https://www.youtube.com/embed/aKuAtXKgDEA?si=Alj5iap7t1-pP6iA&amp;start=219",
    "https://growingnimblefamilies.com/wp-content/uploads/2016/05/take-out-the-trash-1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnxG9QsSSTQMBQk11Ru7Ghkb9EcsxT1mAkOw&s",
    "/media/Jan.jpg"
  ];

  const closeFakeFanOverlay = () => setShowFail(false);
  const closePassOverlay = () => setShowPass(false);
  const getRandomId = () => Math.floor(Math.random() * 1025) + 1;
  const getNewPokemonClick = () => {
    const id = getRandomId();
    setPokemonId(id);
    fetchAPI(id).then((data) => {
      setPokemonData(data);
      setNameRevealed(false);
    });
    setConfettiActive(false);
    setLetsGooDisabled(false);
    setFakeFanDisabled(false);
  };

  useEffect(() => {
    const id = getRandomId();
    setPokemonId(id);
    fetchAPI(id).then((data) => {
      setPokemonData(data);
      setNameRevealed(false);
    });
  }, []);

  useEffect(() => {
    if (!nameRevealed && pokemonData) {
      setTimer(5);
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

  const spriteUrl =
    pokemonData &&
    pokemonData.sprites?.other?.['official-artwork']?.front_default;

  const [timer, setTimer] = useState(5);

  const renderFakeFanButton = () => (
    <button
      className={!nameRevealed || fakeFanDisabled ? 'disable-button button' : 'enable-button button'}
      disabled={!nameRevealed || fakeFanDisabled}
      onClick={() => {
        const idx = Math.floor(Math.random() * fakeFanMedia.length);
        setSelectedMedia(fakeFanMedia[idx]);
        setShowFail(true);
        setConfettiActive(false);
        setLetsGooDisabled(true);
      }}
    >
      FAKE FAN
    </button>
  );

  const renderLetsGoButton = () => (
    <button
      className={!nameRevealed || letsGooDisabled ? 'disable-button button' : 'enable-button button'}
      disabled={!nameRevealed || letsGooDisabled}
      onClick={() => {
        const idx = Math.floor(Math.random() * letsGooMedia.length);
        setSelectedMedia(letsGooMedia[idx]);
        setShowPass(true);
        setConfettiActive(true);
        setFakeFanDisabled(true);
      }}
    >
      LETS GOO
    </button>
  );

  const renderTimer = () => (
    <div className="timer">
      <div>YOU HAVE: </div>
      <div>{timer}</div>
      <div>SECONDS LEFT!!!</div>
    </div>
  );

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
              {renderLetsGoButton()}
              {renderFakeFanButton()}
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
      {showPass && selectedMedia && (
        <div className="fake-fan-overlay" onClick={closePassOverlay}>
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