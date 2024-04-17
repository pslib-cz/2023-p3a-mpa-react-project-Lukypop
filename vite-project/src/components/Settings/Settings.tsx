import { Link } from "react-router-dom"
import { GameContext, GameContextProps } from "../Game/GameContext.tsx"
import { useContext } from "react"
import React from "react"
//rozdelit start money a pocet hracu
const Settings = () => {
    const { state, dispatch } = useContext(GameContext);

    const addPlayer = (playerName: string) => {
        if (state.players.length < 4) {
            const playerId = state.players.length + 1;
            dispatch({ type: "ADD_PLAYER", name: playerName, id: playerId});
        } else {
            alert('Plný počet hráčů');
        }
    };

    const editPlayer = (playerId: number, newName: string) => {
        dispatch({ type: "EDIT_PLAYER", id: playerId, name: newName });
    };

    const removePlayer = (playerId: number) => {
        dispatch({ type: "REMOVE_PLAYER", id: playerId });
    };
    const changeStartMoney = (newMoney: number) => {
        dispatch({ type: "CHANGE_START_MONEY", startMoney: newMoney });
        
    };

    const changeMoneyPerRound = (newMoneyPerRound: number) => {
        dispatch({ type: "CHANGE_MONEY_PER_ROUND", moneyPerRound: newMoneyPerRound });
    };

    return (
        <div>
            {state.players.map(player => (
                <div key={player.playerId}>
                    <input
                        type="text"
                        value={player.name}
                        onChange={e => editPlayer(player.playerId, e.target.value)}
                    />
                    <button onClick={() => removePlayer(player.playerId)}>Odstanit</button>
                </div>
            ))}
            <button onClick={() => addPlayer("Player")}>Přidat hráče</button>
         <div>
         <input
             type="number"
             value={state.players[0].money}
             onChange={e => changeStartMoney(parseInt(e.target.value))}/>
         <label>Start Money</label>

     </div>
     <div>
         <input
             type="number"
             value={state.moneyPerRound}
             onChange={e => changeMoneyPerRound(parseInt(e.target.value))}
         />
         <label>Money Per Round</label>
     </div>
            <div><Link to="/game">Hrát</Link></div>
            <div><Link to="/rules">Pravidla</Link></div>
            <div><Link to="/">Zpět</Link></div>
     </div>

    );
}
export default Settings