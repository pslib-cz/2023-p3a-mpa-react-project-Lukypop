import { Link } from "react-router-dom"
const Rules = () => {
    return (
        <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>Rules</h1>
            <p>Tady jsou velmi důležitá pravidla a jsem fakt línej to teď psát</p>
            <button style={{width: '160px'}}><Link style={{textDecoration: 'none', color: 'white'}}  to="/Settings">Nastavení</Link></button>
        </div>
        </>
    )
}
export default Rules