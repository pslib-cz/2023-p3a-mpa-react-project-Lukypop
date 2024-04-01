import React, { createContext, useReducer, PropsWithChildren } from 'react';
//work in progress

const defaultGameState = {}



const gameReducer = (state: any, action: any): any => {
    switch (action.type) {
        /*case ActionType.UPDATE_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            }
        */}
    }

export const GameContext = createContext<{ state: any; dispatch: React.Dispatch<any> }>({ state: defaultGameState, dispatch: () => undefined });
   
export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, defaultGameState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};