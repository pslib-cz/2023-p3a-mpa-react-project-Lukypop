import { Action } from '@remix-run/router';
import { GameState } from '../Types';
import React, { createContext, useReducer, PropsWithChildren } from 'react';
import fields from '../Data';
import Player from './Player';
//work in progress

export interface GameContextProps {
    state: GameState;
    dispatch: React.Dispatch<ReducerAction>;
  }
  
const defaultGameState : GameState = {
    startMoney: 1000,
    moneyPerRound: 100,
    fields: fields,
    players:[{playerId: 0, name: "Player1", money: 0, position: 0}]
}

type ReducerAction = | { type: "MOVE"; position: number;} |
                       { type: "ADD_PLAYER" ; name: string; id: number}|
                       { type: "EDIT_PLAYER"; name: string; id: number}|
                       { type: "REMOVE_PLAYER"; name: string; id: number}|
                       { type: "CHANGE_START_MONEY"; money: number;}|
                     //   { type: "BUY"; fieldId: number;}|
                      //  { type: "PAY_RENT"; fieldId: number;}|
                      // { type: "PAY_TAX"; }|
                     //   { type: "TAVERN"; fieldId: number;}|
                     //   { type: "CHANCE"; fieldId: number;}|
                     //   { type: "PIMP"; fieldId: number;}|
                       { type: "START"; playerId: number;}
                    //   { type: "TATRY";}
                        
                        

  


const gameReducer = (state: GameState , action: ReducerAction): GameState  => {
    switch (action.type) {
        case "MOVE":
           return {
               //player moves to the new position from input value
                ...state,
                players: state.players.map((player) => {
                    return {
                        ...player,
                        position: action.position
                    }
                })
           }
        
        case "ADD_PLAYER":
            return {
                ...state,
                players: [...state.players, {playerId: action.id, name: action.name, money: state.startMoney, position: 0}]
            
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
                startMoney: action.money
            }
        
        case "START":
            return {
                ...state,
                players: state.players.map((player) => {
                    if(player.playerId === action.playerId) {
                        return {
                            ...player,
                            money: +state.moneyPerRound + player.money,
                            position: 0
                        }
                    }
                    return player;
                })
            }

        }
    }
        

export const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<ReducerAction> }>({ state: defaultGameState, dispatch: () => {}});
   
export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, defaultGameState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};