import { Link } from "react-router-dom";
import { useContext } from "react";
import { GameContext, GameContextProps } from "../Game/GameContext";
export const GameRunning = () => {
    const context = useContext<GameContextProps>(GameContext);

    return (
        <>
            <div>
                <p>Hra je v průběhu</p>
                <div>
                    <button onClick={() => context.dispatch({type: "END_GAME"})}>Ukončit hru</button>
                    <div><Link to="/">Zpět</Link></div>
                    <div><Link to="/Rules">Pravidla</Link></div>
                    <div><Link to="/Game">Zpět do hry</Link></div>


                </div>
            </div>
        </>
    )
}
export default GameRunning