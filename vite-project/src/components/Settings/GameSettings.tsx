import { useContext } from 'react';
import { GameContext, GameContextProps } from '../Game/GameContext';

export const GameSettings = () => {
    const maxPlayers = 4;
    const { state, dispatch } = useContext<GameContextProps>(GameContext);

    const changeStartMoney = (newMoney: number) => {
        dispatch({ type: "CHANGE_START_MONEY", startMoney: newMoney });
    };

    const changeMoneyPerRound = (newMoneyPerRound: number) => {
        dispatch({ type: "CHANGE_MONEY_PER_ROUND", moneyPerRound: newMoneyPerRound });
    };

    const addPlayer = (playerName: string) => {
        if (state.players.length < maxPlayers) {
            const playerId = Math.max(...state.players.map(player => player.playerId)) + 1;
            dispatch({ type: "ADD_PLAYER", name: playerName, id: playerId});

        } else {
            alert('Plný počet hráčů');
        }
    };
    const editPlayer = (playerId: number, newName: string) => {
        dispatch({ type: "EDIT_PLAYER", id: playerId, name: newName });
    };
    const removePlayer = (playerId: number) => {
        if (state.players.length > 2) {
            dispatch({ type: "REMOVE_PLAYER", id: playerId });
        } else {
            alert('Alespoň dva hráči musí zůstat');
        }
    };
    
    return (
        <div style={{textAlign: 'center'}}>
            {state.players.map((player) => (
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '.5em'}}>
                    <input
                        type="text"
                        value={player.name}
                        onChange={e => editPlayer(player.playerId, e.target.value)}
                    />
                    <button onClick={() => removePlayer(player.playerId)}>Odstanit</button>
                </div>
            ))}
            <button style={{marginBottom: '.5em'}} onClick={() => addPlayer("Player " + (state.players.length))}>Přidat hráče</button>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '.5em'}}>
                <input
                    type="number"
                    value={state.startMoney}
                    onChange={e => changeStartMoney(parseInt(e.target.value))}
                />
                <div><label>Rozpočet</label></div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '.5em'
            }}>
                <input
                    type="number"
                    value={state.moneyPerRound}
                    onChange={e => changeMoneyPerRound(parseInt(e.target.value))}
                />
                <div><label>Peníze za kolo</label></div>
            </div>
            <button style={{width: '128px'}} onClick={() => dispatch({ type: "START_GAME"})}>Start</button>
        </div>
    );
}
export default GameSettings
/*
useEffect(() => {
        const settingsData = localStorage.getItem("Settings");
        if(settingsData !== null){
            dispatch({type: "LOAD", newState: JSON.parse(settingsData)})
        } 
    }, []);
    */