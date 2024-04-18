import { Link } from "react-router-dom"
import { useEffect } from "react";
import { GameContext, GameContextProps } from '../Game/GameContext';
import { useContext } from "react";
import GameSettings from "./GameSettings";
import GameRunning from "./GameRunning";

//rozdelit start money a pocet hracu
const Settings = () => {
    const context = useContext<GameContextProps>(GameContext);
    /*useEffect(() => {
        const settingsData = localStorage.getItem("Settings");
        if(settingsData !== null){
            context.dispatch({type: "LOAD", newState: JSON.parse(settingsData)})
        } 
    }, []);*/
    
    return (
        <div>
            <h1>Nastavení</h1>
            {context.state.gameRunning ?  <GameRunning/> : <GameSettings/>}
            
        </div>

    );
}
export default Settings
