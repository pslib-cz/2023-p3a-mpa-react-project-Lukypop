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
  const ownership1 = field.type == "SHEEP"
  if (ownership1 && field.ownership !== null){
    const player = context.state.players.find(a => a.playerId === field.ownership);
    
    if(field.timesUpgraded == 0)
        {
        return (
        <div className={styles["field"]} style={{border: `${player?.color} 1px solid`}}>
           <p className={styles["heading"]}>{field.name}</p>
            {currentColors.map((color) => 
            {
                return <div className={styles[`player--${color}`]} style={{backgroundColor: color,  width: 20, height: 20, borderRadius: 50 }}></div>              
            })}
        </div>
        )}
        else if (field.timesUpgraded > 0){
            console.log("fieldupgrade" + field.timesUpgraded)
            return (

                <div className={`${styles["field"]} ${styles[`fieldupgrade` + `${field.timesUpgraded}`]}`} style={{border: `${player?.color} 1px solid`, background: `./`}}>
                
            <p className={styles["heading"]}>{field.name}</p>
             {currentColors.map((color) => 
             {
                 return <div className={styles[`player--${color}`]} style={{backgroundColor: color,  width: 20, height: 20, borderRadius: 50 }}></div>              
             })}
         </div>
            )
        }
    
    
  }
    if(field.type == "CHANCE"){
        return (
            <div className={`${styles["field"]} ${styles["chanceField"]}`}>
                <p className={styles["heading"]}>{field.name}</p>
                {currentColors.map((color) => 
                {
                    return <div className={styles[`player--${color}`]} style={{backgroundColor: color, width: 20, height: 20, borderRadius: 50}}></div>              
                })}

                <div>

                </div>
            </div>
        )
    }
    if(field.type == "TAVERN"){
        return (
            <div className={`${styles["field"]} ${styles["tavernField"]}`}>
                <p className={styles["heading"]}>{field.name}</p>
                {currentColors.map((color) => 
                {
                    return <div className={styles[`player--${color}`]} style={{backgroundColor: color, width: 20, height: 20, borderRadius: 50}}></div>              
                })}

                <div>

                </div>
            </div>
        )
    }
    if(field.type == "TATRY"){
        return (
            <div className={`${styles["field"]} ${styles["tatryField"]}`}>
                <p className={styles["heading"]}>{field.name}</p>
                {currentColors.map((color) => 
                {
                    return <div className={styles[`player--${color}`]} style={{backgroundColor: color, width: 20, height: 20, borderRadius: 50}}></div>              
                })}

                <div>

                </div>
            </div>
        )
    }
    if(field.type == "TAX"){
        return (
            <div className={`${styles["field"]} ${styles["taxField"]}`}>
                <p className={styles["heading"]}>{field.name}</p>
                
                            {currentColors.map((color) => 
                            {
                                return (
                                    <div className={styles[`player--${color}`]} style={{backgroundColor: color, width: 20, height: 20, borderRadius: 50, boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)"}}></div>              
                                )
                            })}

                            <div>

                            </div>
                        </div>
                    )
                }

    return (
        <div className={styles["field"]}>
            <p className={styles["heading"]}>{field.name}</p>
            {currentColors.map((color) => 
            {
                return <div className={styles[`player--${color}`]} style={{backgroundColor: color, width: 20, height: 20, borderRadius: 50}}></div>              
            })}

            <div>

            </div>
        </div>
    )
   
}
export default Field

