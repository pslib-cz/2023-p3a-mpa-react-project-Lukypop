import { FieldType } from "../Types";

type FieldProps = {
    field: FieldType;
};

 const Field: React.FC<FieldProps> = ({field}) => {
    switch (field.type) {
        case "SHEEP":
          return (
            <div>
              <h2>{field.name}</h2>
              <p>Price: {field.price}</p>
              <p>Rent: {field.rent}</p>
              <p>Racing Level: {field.racingLevel}</p>
              <p>Color: {field.color}</p>
            </div>
          );
        case "TAX":
          return (
            <div>
              <h2>{field.name}</h2>
              <p>Price: {field.price}</p>
            </div>
          );
        case "PIMP":
          return (
            <div>
              <h2>{field.name}</h2>
              <p>Price: {field.price}</p>
              <p>Rent: {field.rent}</p>
            </div>
          );
        // Add cases for other field types as needed
        case "CHANCE":
          return (
            <div>
              <h2>{field.name}</h2>
            </div>
          );
        case "START":
        case "TATRY":
        case "TAVERN":
        case "FREE_PARKING":
          return (
            <div>
              <h2>{field.name}</h2>
            </div>
          );
        default:
          return null; // If field type is not recognized, render nothing
      }
}
export default Field