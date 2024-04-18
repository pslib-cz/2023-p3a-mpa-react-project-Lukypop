import { useState, useContext } from "react";
import { Link } from "react-router-dom"
import { GameContext, GameContextProps } from "./GameContext.tsx"
import Field from "./Field.tsx"
import styles from './GameBoard.module.css';

const Gameboard = () => {

    const context = useContext<GameContextProps>(GameContext);
    
    const [diceRoll, setDiceRoll] = useState(0)
    
    const handleDiceRoll = () => {
        setDiceRoll((Math.floor(Math.random() * 6) + 1)+ (Math.floor(Math.random() * 6) + 1))
        context.dispatch({type: "MOVE", howMuch: diceRoll})
    }

    return (
        <>
            <div className={styles["gameboard"]}>
                
                <div className={styles["gameboard--middle"]}>
                        <div>   <p style={{textAlign: "center", color: "black", fontSize: 32}}>{diceRoll}</p>
                                <button className={styles["gameboard--middle--button"]} onClick={handleDiceRoll}>Roll dice</button>
                        </div>
                    </div>
                {context.state.fields.map((field, index) => {  
                    
                        const gridSomething = `${field.y} / ${field.x}`;
                        return(<div id='kokot' style={{gridArea: gridSomething}} ><Field key={index} field={field} currentColors={context.state.players.filter(a => a.position === field.FieldId).map(b => b.color)}/></div>)
                    })}
                    
                
                
                
            </div>
            
            {context.state.players.map((player) => {
                return (
                    <div>
                        <p>{player.name}</p>
                        <p>{player.money}</p>
                    </div>
                )})}

                    <div><Link to="/">Zpět</Link></div>
                    <div><Link to="/Rules">Pravidla</Link></div>
                    <div><Link to="/Settings">Zpět do hry</Link></div>
                
            
        </>
    )
}
export default Gameboard

/*
                    else if(index > 0 && index < 10 || index > 29) {
                         return(<div className={styles["gameboard--1by2"]}><Field key={index} field={field} currentColors={context.state.players.filter(a => a.position === field.FieldId).map(b => b.color)}/></div>)
                    }      
                    else if(index%2 === 0 && index > 10 && index < 30 || index%2 === 1 && index > 10 && index < 30) {
                        return(<div className={styles["gameboard--2by1"]}><Field key={index} field={field} currentColors={context.state.players.filter(a => a.position === field.FieldId).map(b => b.color)}/></div>)
                    }*/