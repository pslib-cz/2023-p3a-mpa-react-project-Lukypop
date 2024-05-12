import { GameContext, GameContextProps } from '../Game/GameContext';
import { useContext } from "react";
import GameSettings from "./GameSettings";
import GameRunning from "./GameRunning";

//rozdelit start money a pocet hracu
const Settings = () => {
    const context = useContext<GameContextProps>(GameContext);
    
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <div style={{width: '280px'}}>
                <h1 style={{textAlign: 'center'}}>Nastavení</h1>
                {context.state.gameRunning ?  <GameRunning/> : <GameSettings/>}
            </div>
        </div>

    );
}
export default Settings
