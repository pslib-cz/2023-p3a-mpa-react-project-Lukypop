import { useContext } from "react";
import { Link } from "react-router-dom"
import { GameContext, GameContextProps } from "./GameContext.tsx"
import Field from "./Field.tsx"
import styles from './GameBoard.module.css';

const Gameboard = () => {

    const context = useContext<GameContextProps>(GameContext);
    
    const handleDiceRoll = () => {
        const diceRoll = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
        console.log("Rolling dice: " + diceRoll);
        
        context.dispatch({type: "MOVE", howMuch: diceRoll, playerId: context.state.currentPlayer});
        context.dispatch({type: "NEXT_PLAYER"});
    }

    return (
        <>
            <div className={styles["gameboard"]}>
                        {context.state.fields.map((field, index) => {  
                    
                        const gridSomething = `${field.y} / ${field.x}`;
                        return(<div id='policko' style={{gridArea: gridSomething}} ><Field key={index} field={field} currentColors={context.state.players.filter(a => a.position === field.FieldId).map(b => b.color)}/></div>)
                    })}
                    <div  style={{gridArea: '5/8/8/5' }} >
                                <button style={{width: '100%', height: '100%'}} onClick={handleDiceRoll}>Roll dice</button>
                    </div>
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
                    <div><Link to="/Settings">Zpět do nastavení</Link></div>
                
            
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