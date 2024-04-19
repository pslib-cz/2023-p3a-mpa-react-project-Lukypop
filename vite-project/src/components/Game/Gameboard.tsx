import { useContext } from "react";
import { Link } from "react-router-dom"
import { GameContext, GameContextProps } from "./GameContext.tsx"
import Field from "./Field.tsx"
import styles from './GameBoard.module.css';

const Gameboard = () => {

    const context = useContext<GameContextProps>(GameContext);
    
    const handleDiceRoll = () => {
        if (context.state.playerRolled === true){
            context.dispatch({type: "NEXT_PLAYER"});
        }

        else context.dispatch({type: "ROLL_DICE"});
    }

    let buttonChoser = <div></div>;
    const currentPlayer = context.state.players.find(b => b.playerId === context.state.currentPlayer)
    if (currentPlayer!== undefined && context.state.playerDone === false && context.state.playerRolled === true){
        const currentPlayerField = context.state.fields.find(a => a.FieldId === currentPlayer?.position);
        if (currentPlayerField && (currentPlayerField.type === "SHEEP" || currentPlayerField.type === "PIMP")){
            if(currentPlayerField.ownership === null){
                if(currentPlayer.money >= currentPlayerField.price){
                    buttonChoser = <div><button onClick={() => {
                        context.dispatch({type: "BUY_FIELD", playerId: currentPlayer.playerId, fieldId: currentPlayerField.FieldId})
                    }}>Koupit pole</button></div>
                
                }
            }
            else if (currentPlayerField.ownership === currentPlayer.playerId){
                buttonChoser = <div><button onClick={() => {context.dispatch({type: "UPGRADE_FIELD", playerId: currentPlayer.playerId, fieldId: currentPlayerField.FieldId})
            }}>Vylepšit pole</button></div>
            }
            else {
                context.dispatch({type: "PAY_RENT", playerId: currentPlayer.playerId, fieldId: currentPlayerField.FieldId})}

        }
        else{

        }
    }
    

    return (
        <>
            <div className={styles["gameboard"]}>
                        {context.state.fields.map((field, index) => {  
                    
                        const gridSomething = `${field.y} / ${field.x}`;
                        return(<div id='policko' style={{gridArea: gridSomething}} ><Field key={index} field={field} currentColors={context.state.players.filter(a => a.position === field.FieldId).map(b => b.color)}/></div>)
                    })}
                    <div  style={{gridArea: '5/8/8/5' }} >
                                <button style={{width: '100%', height: '100%'}} onClick={handleDiceRoll}>{context.state.playerRolled ? "NEXT PLAYER": "ROLL_DICE"}</button> 
                    </div>
                    <div  style={{gridArea: '5/9/8/6' }} >
                        {buttonChoser}
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