import { GameState, PlayerColor } from '../Types';
import React, { createContext, useReducer, PropsWithChildren } from 'react';
import fields from '../Data';

export interface GameContextProps {
    state: GameState;
    dispatch: React.Dispatch<ReducerAction>;
  }
const defaultGameState : GameState = {
    currentPlayer: 0, 
    gameRunning: false,
    startMoney: 1000,
    moneyPerRound: 100,
    fields: fields,
    playerDone: false,
    playerRolled: false,
    players:[{playerId: 0, name: "Player 0", money: 1000, position: 0, color: PlayerColor.RED}]
}


type ReducerAction = |  { type: "START_GAME";}|
                        { type: "END_GAME";}| 

                        { type: "ADD_PLAYER" ; name: string; id: number}|
                        { type: "EDIT_PLAYER"; name: string; id: number}|
                        { type: "REMOVE_PLAYER"; id: number}|

                        { type: "CHANGE_START_MONEY"; startMoney: number;}|
                        { type: "CHANGE_MONEY_PER_ROUND"; moneyPerRound: number;}|

                        { type: "NEXT_PLAYER";}|
                        { type: "ROLL_DICE";}|

                        { type: "BUY_FIELD"; playerId: number; fieldId: number;}|
                        { type: "UPGRADE_FIELD"; playerId: number; fieldId: number;}|
                        { type: "PAY_RENT"; playerId: number; fieldId: number;}|

                        { type: "LOAD"; newState: GameState;}

const gameReducer = (state: GameState , action: ReducerAction): GameState  => {
    const colors = ['RED', 'GREEN', 'YELLOW', 'BLUE'] as PlayerColor[];
    


    switch (action.type) {

        case "ADD_PLAYER":
            const color = colors[state.players.length];
            return {
                    ...state,
                    players: [...state.players, {playerId: action.id, name: action.name, money: state.startMoney, position: 0 , color: color}]
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
        
        
        case "NEXT_PLAYER":
            return {
                ...state,
                playerDone: false,
                playerRolled: false,
                currentPlayer: (state.currentPlayer + 1) % state.players.length
            }
        case "BUY_FIELD":
            if (state.playerDone) {
                return state;
            }
            const field = state.fields.find((field) => field.FieldId === action.fieldId)
            const player = state.players.find((player) => player.playerId === action.playerId)   
            if (field === undefined || player === undefined) {
                return state;
            } 
            if (field.type !== "SHEEP" && field.type !== "PIMP") {
                return state;
            }

          
        return {
                ...state, 
                playerDone: true,
                players: state.players.map((player) => {
                    if(player.playerId === action.playerId) {
                        return {
                            ...player,

                            money: player.money - field.price,

                        }
                    }
                    return player;
                }),
                fields: state.fields.map((field) => {
                    if(field.FieldId === action.fieldId) {
                        
                        return {
                            ...field,
                            ownership: player.playerId
                        }
                    }
                    return field;
                })
            }
        case "UPGRADE_FIELD":
            if (state.playerDone) {
                return state;
            }
            return state
        case "PAY_RENT":
            if (state.playerDone) {
                return state;
            }
            const field1 = state.fields.find((field) => field.FieldId === action.fieldId)
            const player1 = state.players.find((player) => player.playerId === action.playerId)
            if (field1 === undefined || player1 === undefined) {
                return state;
            }
            if (field1.type !== "SHEEP" && field1.type !== "PIMP") {
                return state;
            }
            const owner = state.players.find((player) => player.playerId === field1?.ownership)
            if (owner === undefined) {
                return state;
            }
            return {
                ...state,
                playerDone: true,

                players: state.players.map((player) => {
                    if(player.playerId === action.playerId) {
                        return {
                            ...player,
                            money: player.money - (field1.rent*field1.multiplayer)
                        }
                    }
                    if(player.playerId === owner.playerId) {
                        return {
                            ...player,
                            money: player.money + (field1.rent*field1.multiplayer)
                        }
                    }
                    return player;
                })
            }
            case "ROLL_DICE":
                const diceRoll = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
            return {

                ...state,
                playerRolled: true,

                players: state.players.map((player) => {
                    if(player.playerId === state.currentPlayer) {
                        return {
                            ...player,
                            position: (player.position + diceRoll) % 40,
                            money: player.money +((player.position + diceRoll >= 40) ? state.moneyPerRound : 0)
                        }
                    }
                    return player;
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