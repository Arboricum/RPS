//import './TextComponent.css'
import * as React from "react";
import GameArea from "./GameArea";
import "./Morra.css";
import { gameContext } from "./App";

class Morra extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                showRules: props.showRules,
                playerValue: '',
                pcValue: '',
                score: 0,
                choiceDone: false,
                gameover: props.gameover,
                reset: props.reset, 
                result: '',
                winner: ''
            };
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.showRules !== prevProps.showRules) {
            console.log('current rules', this.props.showRules)
            this.setState({ showRules: this.props.showRules }); // Aggiorna showRules se pippo cambia
        }
        if (this.props.gameover !== prevProps.gameover) {
            console.log('current rules', this.props.gameover)
            this.setState({ gameover: this.props.gameover }); // Aggiorna showRules se pippo cambia
        }
        if (this.props.reset !== prevProps.reset && this.props.reset === true) {
            this.reset();
        }
    }
    
    play = (value) => {
        console.log('pippo', this.state.showRules);
        let pcValueRandom = Math.floor((Math.random() * 5) + 1);
        let pcValueRandomResult = '';
        switch (pcValueRandom) {
        case 1:
        pcValueRandomResult = 'Paper';
        break;

        case 2:
        pcValueRandomResult = 'Scissors';
        break;

        case 3:
        pcValueRandomResult = 'Rock';
        break;

        case 4:
        pcValueRandomResult = 'Lizard';
        break;

        case 5:
        pcValueRandomResult = 'Spock';
        break;

        default:
            break;
        }
        console.log(value, pcValueRandomResult)
        this.gameResult(value, pcValueRandomResult);
    }
    gameResult(value, pcValueRandomResult) {
        this.setState({playerValue: value});
        this.setState({choiceDone: true});
        setTimeout(()=> {
            this.setState({pcValue: pcValueRandomResult});
        },1000);        
        if (value === pcValueRandomResult) {            
                this.win('DRAW');
                this.setState({ gameover: true, winner: '' });
        } else if (
          (value === 'Paper' && pcValueRandomResult === 'Rock') ||
          (value === 'Paper' && pcValueRandomResult === 'Spock') ||
          (value === 'Rock' && pcValueRandomResult === 'Lizard') ||
          (value === 'Rock' && pcValueRandomResult === 'Scissors') ||
          (value === 'Scissors' && pcValueRandomResult === 'Paper') ||
          (value === 'Scissors' && pcValueRandomResult === 'Lizard') ||
          (value === 'Lizard' && pcValueRandomResult === 'Spock') ||
          (value === 'Lizard' && pcValueRandomResult === 'Paper') ||
          (value === 'Spock' && pcValueRandomResult === 'Scissors') ||
          (value === 'Spock' && pcValueRandomResult === 'Rock')
        ) {     
            setTimeout(()=> {
                this.win('YOU WIN');
                this.setState({ score: this.state.score + 1 });
                this.setState({ gameover: true, winner: 'player' });
            }, 2000)                      
        } else {   
            setTimeout(()=> {
                this.win('YOU LOSE');
                this.setState({ gameover: true, winner: 'pc' });
            }, 2000)                 
        }
      }
    win(winnerMessage) {
    console.log(winnerMessage);
    this.setState({ result: winnerMessage });    
    // Impostazione del vincitore dopo 1 secondo
    /* setTimeout(() => {
        this.setState({ choiceDone: false });
    
        // Esempio: Impostazione di playerValue e pcValue dopo 1 secondo
        setTimeout(() => {
        if (this.state.pcValue !== "") {
            this.setState({
            pcValue: "",
            playerValue: "",
            result: ""
            });
        }
        }, 10);
    }, 300000); */
    } 
    reset() {
        this.setState({
            choiceDone: false,
            pcValue: "",
            playerValue: "",
            result: "",
            winner: ''
        });
    } 
    render() { 
        return <MainContainer 
        state={this.state} 
        play={this.play} 
        gameResult={this.gameResult} 
        win={this.win} 
        />;          
    }   
}
function MainContainer({ state, play, gameResult, win }) {
    const [localState, setLocalState] = React.useState(state);
    const {playerChoice} = React.useContext(gameContext);
    const {setPlayerChoice} = React.useContext(gameContext);   
    const {setShowRules} = React.useContext(gameContext); 
    const {setGameover} = React.useContext(gameContext);
    const {setReset} = React.useContext(gameContext);
    React.useEffect(()=> {
        console.log(playerChoice, "playerChoice");
        if (playerChoice !== "") {
            play(playerChoice);
            setPlayerChoice("");
        }        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerChoice])
    React.useEffect(()=> {
        console.log(state);
        setLocalState(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])
    React.useEffect(()=> {
        console.log(localState.gameover);
        setGameover(localState.gameover);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localState.gameover])
    return (
        <div className="main-container">
            <header>
                <h1>
                    ROCK<br/>
                    PAPER<br/>
                    SCISSORS<br/>
                    LIZARD<br/>
                    SPOCK<br/>
                </h1>
                <span>
                    <h5>SCORE</h5>
                    <p>{localState.score}</p>
                </span>
            </header>
            <main className={localState.choiceDone? "game-area result-shown": "game-area"}>
                <GameArea
                currentPlayerValue={localState.playerValue}
                currentPcValue={localState.pcValue}
                gameStart={localState.choiceDone}
                winner={localState.winner}
                ></GameArea> 
                <section className="result-display">
                {localState.gameover? 
                <>
                <h1>{localState.result}</h1>
                <button 
                    type="button" 
                    className="replay-button"
                    onClick={()=> {
                        setGameover(false);
                        setReset(true);
                        }
                    }
                    >
                    PLAY AGAIN
                </button>
                </> :
                ""}
            </section>               
            </main>
            {localState.showRules ? <RuleArea></RuleArea> : ""}            
            <div className="rules-button-container">
                <button
                    className="rules-button"
                    type="button"
                    onClick={() => {
                    //setLocalState({ ...localState, showRules: !localState.showRules });
                    setShowRules(true);
                    console.log(localState.showRules);
                    }}
                >
                    RULES
                </button>
            </div>            
            <footer className="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
                Coded by <a href="https://www.yaripiras.it" rel="noreferrer">Yari Piras</a>.
            </footer>
            </div>
    )
}
function RuleArea() {
    const {setShowRules} = React.useContext(gameContext);
    return (
        <section className="rules-area"> 
            <h1>RULES</h1>
            <div>
                <img 
                    src={process.env.PUBLIC_URL + '/images/image-rules-bonus.svg'} 
                    alt="rules"/>
            </div>
            <div>
                <img 
                    src={process.env.PUBLIC_URL + '/images/icon-close.svg'} 
                    alt="close rules"
                    onClick={()=>{
                        setShowRules(false);
                        console.log('setting rules')
                    }}
                />
            </div>
        </section>
    )
}

export default Morra;