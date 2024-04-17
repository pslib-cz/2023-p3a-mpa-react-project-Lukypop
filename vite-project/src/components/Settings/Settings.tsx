import { Link } from "react-router-dom"
import { GameContext, GameContextProps } from "../Game/GameContext.tsx"

const Settings = () => {
    return (
        <>
        <h1>Nastavení hry</h1>
            <h2>Ještě než to všechno začne tak je zde pár možností</h2>
            <div><Link to="/game">Hrát</Link></div>
            <div><Link to="/">Zpět</Link></div>


        </>
    )
}
export default Settings