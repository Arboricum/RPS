import * as React from "react";
import "./GameArea.css";
import { gameContext } from "./App";

const buttons = [
    {
        name: "Scissors",
        className: "scissors",
        spanClassName: "scissorsOut"
    },
    {
        name: "Paper",
        className: "paper",
        spanClassName: "paperOut"
    },    
    {
        name: "Rock",
        className: "rock",
        spanClassName: "rockOut"
    },
    {
        name: "Lizard",
        className: "lizard",
        spanClassName: "lizardOut"
    },
    {
        name: "Spock",
        className: "spock",
        spanClassName: "spockOut"
    }
];

function GameArea({ currentPlayerValue, currentPcValue, gameStart, winner }) {
    const { setPlayerChoice } = React.useContext(gameContext);
    const {setReset} = React.useContext(gameContext);
    const [gameStarted, setGameStarted] = React.useState(gameStart);
    React.useEffect(()=> {
        console.log(gameStart);
        setGameStarted(gameStart);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStart]);
    const [imgLeft, setImgLeft] = React.useState(0); // Inizializzato a 0
    const [imgTop, setImgTop] = React.useState(0);
    const styleMap = {
        scissors: { left: 0, top: -40 },
        paper: { left: 100, top: 40 },
        rock: { left: 60, top: 150 },
        lizard: { left: -60, top: 150 },
        spock: { left: -100, top: 40 },
        // Aggiungi altri stili per gli altri pulsanti...
    };
    const handleResize = () => {
        const image = document.querySelector('.poly');
        if (image) {
            setImgLeft(image.offsetLeft);
            setImgTop(image.offsetTop);
        }
    };
    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [imgLeft, imgTop]);
    const handlePosition = (e) => {
        setImgLeft(e.target.offsetLeft);
        setImgTop(e.target.offsetTop);
        console.log(e.target.offsetLeft," and ", e.target.offsetTop)
    };   
    return (
        <>
            {gameStarted ? 
                <>
                <div className="playerResult">
                    <div
                        className={
                            (currentPlayerValue !== "" && winner !== 'player') ? currentPlayerValue.toLowerCase()+'Out' :
                            (currentPlayerValue !== "" && winner === 'player') ? currentPlayerValue.toLowerCase()+'Out winnerBkg':
                             ""}>
                    </div> 
                    <h5>YOU PICKED</h5>
                </div>
                <div className="pcResult">
                    <div 
                        className={
                            (currentPlayerValue !== "" && winner !== 'pc') ? currentPcValue.toLowerCase()+'Out' :
                            (currentPlayerValue !== "" && winner === 'pc') ? currentPcValue.toLowerCase()+'Out winnerBkg':
                             "emptyChoice"}>
                    </div>
                    <h5>THE HOUSE PICKED</h5>
                </div>
                </>
                :
                <>
                <img 
                    className="poly"
                    src={process.env.PUBLIC_URL + '/images/pentagon-svgrepo-com.svg'} 
                    alt="" 
                    onLoad={handlePosition}
                />
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className={button.className}
                        style={{
                            ...styleMap[button.className.toLowerCase()],
                            left: `calc(${styleMap[button.className.toLowerCase()].left}px + ${imgLeft}px)`,
                            top: `calc(${styleMap[button.className.toLowerCase()].top}px + ${imgTop}px)`
                        }}
                        onClick={() => {
                            setPlayerChoice(button.name);
                            setReset(false);
                        }}
                    >
                        {button.name}
                    </button>
                ))}
                </>
            }
        </>
    );
}

export default GameArea;
