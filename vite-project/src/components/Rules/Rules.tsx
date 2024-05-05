import { Link } from "react-router-dom"
const Rules = () => {
    return (
        <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>Rules</h1>
            <p>Tady jsou velmi důležitá pravidla a jsem fakt línej to teď psát</p>
            <div><Link to="/">Zpět</Link></div>
        </div>
        </>
    )
}
export default Rules