import { GameState, PlayerColor } from '../Types';
import React, { createContext, useReducer, PropsWithChildren } from 'react';
import fields from '../Data';
//work in progress

export interface GameContextProps {
    state: GameState;
    dispatch: React.Dispatch<ReducerAction>;
  }
const defaultGameState : GameState = {
    gameRunning: false,
    startMoney: 1000,
    moneyPerRound: 100,
    fields: fields,
    players:[{playerId: 0, name: "Player 0", money: 1000, position: 0, color: PlayerColor.GREEN}]
}


type ReducerAction = |  { type: "START_GAME";}|
                        { type: "END_GAME";}| 

                        { type: "ADD_PLAYER" ; name: string; id: number}|
                        { type: "EDIT_PLAYER"; name: string; id: number}|
                        { type: "REMOVE_PLAYER"; id: number}|

                        { type: "CHANGE_START_MONEY"; startMoney: number;}|
                        { type: "CHANGE_MONEY_PER_ROUND"; moneyPerRound: number;}|

                        { type: "MOVE"; howMuch: number;} |
                     //   { type: "ADD_MONEY"; playerId: number; amount: number;}|
                     //   { type: "BUY"; fieldId: number;}|
                     //   { type: "PAY_RENT"; fieldId: number;}|
                     //   { type: "PAY_TAX"; }|
                     //   { type: "TAVERN"; fieldId: number;}|
                     //   { type: "CHANCE"; fieldId: number;}|
                     //   { type: "PIMP"; fieldId: number;}|
                     //   { type: "TATRY";}

                     //  { type: "START"; playerId: number;} |
                       { type: "LOAD"; newState: GameState;}

const gameReducer = (state: GameState , action: ReducerAction): GameState  => {
    switch (action.type) {
        case "ADD_PLAYER":
            return {
                ...state,
                players: [...state.players, {playerId: action.id, name: action.name, money: state.startMoney, position: 0, color: PlayerColor.RED}]
            } 
        case "EDIT_PLAYER":
            return {
                ...state,
                players: state.players.map((player) => {
                    if(player.playerId === action.id) {
                        return {
                            ...player,
                            name: action.name
                        }
                    }
                    return player;
                })
            }
        case "REMOVE_PLAYER":
            return {
                ...state,
                players: state.players.filter((player) => player.playerId !== action.id)
            }
        case "CHANGE_START_MONEY":
            return {
                ...state,
                players: state.players.map((player) => {
                    return {
                        ...player,
                        money: action.startMoney
                    }
                }),
                startMoney: action.startMoney
            }
        case "CHANGE_MONEY_PER_ROUND":
            return {
                ...state,
                moneyPerRound: action.moneyPerRound 
        }
        
        case "LOAD":
            return action.newState;

        case "START_GAME":
            return {
                ...state,
                gameRunning: true
            }
        case "END_GAME":
            return defaultGameState;
        
        case "MOVE":

           return {
                ...state,
                players: state.players.map((player) => {
                    return {
                        ...player,
                        position: player.position + action.howMuch
                    }
                })
            }
        }
    }

           
       /* case "START":
            return {
                ...state,
                players: state.players.map((player) => {
                    if(player.playerId === action.playerId) {
                        return {
                            ...player,
                            money: state.moneyPerRound + player.money,
                            position: 0
                        }
                    }
                    return player;
                })
            }*/
        
    
        

export const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<ReducerAction> }>({ state: defaultGameState, dispatch: () => {}});
   
export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, defaultGameState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};