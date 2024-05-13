import { Link } from "react-router-dom";
import { useContext } from "react";
import { GameContext, GameContextProps } from "../Game/GameContext";
export const GameRunning = () => {
    const context = useContext<GameContextProps>(GameContext);

    return (
        <>
            <div style={{textAlign: "center"}}>
                <p>Hra je v průběhu, buď to vypni nebo se hezky vrať a dokonej to co jsi začal/a.</p>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <button style={{width: '128px', marginBottom: '.5em'}}><Link style={{textDecoration: 'none', color: 'white', width: '100%'}} to="/Game">Zpět do hry</Link></button>
                    <button style={{width: '128px', marginBottom: '.5em'}}><Link style={{textDecoration: 'none', color: 'white', width: '100%'}} to="/Rules">Pravidla</Link></button>
                    <button id="konec" onClick={() => context.dispatch({type: "END_GAME"})}>Ukončit hru</button>


                </div>
            </div>
            
        </>
    )
}
export default GameRunning