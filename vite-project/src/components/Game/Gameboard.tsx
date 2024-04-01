import { Link } from "react-router-dom"
import Field from "./Field.tsx"
import fields from "../Data.tsx"
const Gameboard = () => {
    
    return (
        <>
            <div>
                {fields.map((field, index) => {
                    return <Field key={index} field={field} />
                }
                )}
            </div>
        </>
    )
}
export default Gameboard