import React, { useContext } from 'react';
import { GameContext, GameContextProps } from './Game/GameContext';
import { Link } from 'react-router-dom';
const EndScreen = () => {
    const context = useContext<GameContextProps>(GameContext);
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Konec hry</h1>
            <p>Výhra je tvá, než ti ji slovenská vláda i se vším co máš zabaví, ale prozatím jsi vítěz a užij si to! ❤️🐑</p>
            <button onClick={() => {context.dispatch({type: "END_GAME"})
                                    context.state.victory = false,
                                    context.state.gameRunning = false}
        } style={{width: '160px'}}><Link style={{textDecoration: 'none', color: 'white'}} to="/Settings">Hrát znovu</Link></button>
        </div>
    )
}
export default EndScreen
