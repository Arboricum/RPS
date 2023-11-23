import { createContext, useState } from 'react';
import './App.css';
import Morra from './Morra';

export const gameContext = createContext();

function App() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [reset, setReset] = useState(false);
  return (
    <div className="App">
      <gameContext.Provider value={{
        playerChoice,
        setPlayerChoice,
        setShowRules,
        setGameover,
        setReset
      }}>
        <Morra 
        showRules={showRules}
        gameover={gameover}
        reset={reset}/>
      </gameContext.Provider>      
    </div>
  );
}

export default App;
