import Player from "./Player.tsx"
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { GameContext, GameContextProps } from "./GameContext.tsx"
import Field from "./Field.tsx"
import styles from './GameBoard.module.css';
import fields from "../Data.tsx"
const Gameboard = () => {
    const context = useContext<GameContextProps>(GameContext);
    const [diceRoll, setDiceRoll] = useState(0)
    const handleDiceRoll = () => {
        setDiceRoll((Math.floor(Math.random() * 6) + 1)+ (Math.floor(Math.random() * 6) + 1));

    }

    useEffect(() => {

        if(context.state.players[0].position > 39) {
            context.dispatch({type: "MOVE", position: context.state.players[0].position - 40})
        }
        

    }, [context.state.players[0].position])



    useEffect(() => {        
        context.dispatch({type: "MOVE", position: context.state.players[0].position + diceRoll})
        
    }, [diceRoll])
    
    return (
        <>
            <div className={styles["gameboard"]}>
                <div className={styles["gameboard--middle"]}>
                        <div>   <p style={{textAlign: "center", color: "black", fontSize: 32}}>{diceRoll}</p>
                                <button className={styles["gameboard--middle--button"]} onClick={handleDiceRoll}>Roll dice</button>
                        </div>
                    </div>

                {context.state.fields.map((field, index) => {
                    if (context.state.players[0].position === field.FieldId) {
                        
                        return(<div className={styles["gameboard--player"]}><Player/></div>)
                    }
                    else if (field.type === "START" || field.type === "TAVERN" || field.type === "FREE_PARKING" || field.type === "TATRY" ) {
                    
                        return(<div className={styles["gameboard--2by2"]}><Field key={index} field={field} /></div>)} 
                    else if(index > 0 && index < 10 || index > 29) {
                        return(<div className={styles["gameboard--1by2"]}><Field key={index} field={field} /></div>)}
                    else if(index%2 === 0 && index > 10 && index < 30 || index%2 === 1 && index > 10 && index < 30) {
                        return(<div className={styles["gameboard--2by1"]}><Field key={index} field={field} /></div>)}
                    
                    }

                )}
                
            </div>
        </>
    )
}
export default Gameboard