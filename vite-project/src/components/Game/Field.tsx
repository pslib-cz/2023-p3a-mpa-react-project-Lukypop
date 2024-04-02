import { FieldType } from "../Types";

type FieldProps = {
    field: FieldType;
};

 const Field: React.FC<FieldProps> = ({field}) => {
    switch (field.type) {
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
      }
}
export default Field