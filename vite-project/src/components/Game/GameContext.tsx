import { Action } from '@remix-run/router';
import { GameState } from '../Types';
import React, { createContext, useReducer, PropsWithChildren } from 'react';
import fields from '../Data';
//work in progress
export interface GameContextProps {
    state: GameState;
    dispatch: React.Dispatch<ReducerAction>;
  }
const defaultGameState : GameState = {
    fields: fields,
    players:[{name: "Player 1", position: 0, money: 1500}]
}
type ReducerAction = | { type: "MOVE"; position: number;}


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