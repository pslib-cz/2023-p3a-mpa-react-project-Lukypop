import { Link } from "react-router-dom"
import Field from "./Field.tsx"
import styles from './GameBoard.module.css';
import fields from "../Data.tsx"
const Gameboard = () => {
    
    return (
        <>
            <div className={styles["gameboard"]}>
                <div className={styles["gameboard--middle"]}><button className={styles["gameboard--middle--button"]}>Roll dice</button></div>

                {fields.map((field, index) => {
                    if (field.type === "START" || field.type === "TAVERN" || field.type === "FREE_PARKING" || field.type === "TATRY" ) {
                        return(<div className={styles["gameboard--2by2"]}><Field key={index} field={field} /></div>)} 
                    if(index > 0 && index < 10 || index > 29) {
                        return(<div className={styles["gameboard--1by2"]}><Field key={index} field={field} /></div>)}
                    if(index%2 === 0 && index > 10 && index < 30 || index%2 === 1 && index > 10 && index < 30) {
                        return(<div className={styles["gameboard--2by1"]}><Field key={index} field={field} /></div>)}
                    }
                )}
                
            </div>
        </>
    )
}
export default Gameboard