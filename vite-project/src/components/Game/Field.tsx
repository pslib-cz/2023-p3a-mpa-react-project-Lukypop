import { FieldType, PlayerColor } from "../Types";
import styles from './Field.module.css';
import { GameContext, GameContextProps } from "./GameContext";
import { useContext } from "react";
type FieldProps = {
    field: FieldType;
    currentColors: PlayerColor[];
};


 const Field: React.FC<FieldProps> = ({field, currentColors}) => {
  const context = useContext<GameContextProps>(GameContext);
  const ownership1 = field.type == "SHEEP" || field.type == "PIMP" 
  if (ownership1){
    const player = context.state.players.find(a => a.playerId === field.ownership);
    return (
        <div className={styles["field"]} style={{border: `${player?.color} 1px solid`}}>
           <p className={styles["heading"]}>{field.name}</p>
            {currentColors.map((color) => 
            {
                return <div className={styles[`player--${color}`]} style={{backgroundColor: color}}></div>              
            })}
        </div>
    )
  }

    return (
        <div className={styles["field"]}>
            <p className={styles["heading"]}>{field.FieldId}</p>
            {currentColors.map((color) => 
            {
                return <div className={styles[`player--${color}`]} style={{backgroundColor: color}}></div>              
            })}

            <div>

            </div>
        </div>
    )
   
}
export default Field

