import { FieldType, PlayerColor } from "../Types";
import styles from './Field.module.css';
type FieldProps = {
    field: FieldType;
    currentColors: PlayerColor[];
};


 const Field: React.FC<FieldProps> = ({field, currentColors}) => {
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


/*
switch (field.type) {
      </div>
        case "SHEEP":
          return (
            <div>
              <p>{field.FieldId}</p>
            </div>
          );
        case "TAX":
          return (
            <div>
              <p>{field.FieldId}</p>
            </div>
          );
        case "PIMP":
          return (
            <div>
              <p>{field.FieldId}</p>
            </div>
          );
        case "CHANCE":
          return (
            <div>
              <p>{field.FieldId}</p>
            </div>
          );
        case "START":
            return (
                <div>
                <h2>{field.name}</h2>
                </div>
            );
        case "TATRY":
            return (
                <div>
                <h2>{field.name}</h2>
                </div>
            );
        case "TAVERN":
            return (
                <div>
                <h2>{field.name}</h2>
                </div>
            );
        case "FREE_PARKING":
          return (
            <div>
              <h2>{field.name}</h2>
            </div>
          );
        default:
          return null; // This should never happen
      */