import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <>
            <div>
                <h1>Tatranský závody ovcí</h1>
                <div><Link to="/game">Start</Link></div>
                <div><Link to="/rules">Rules</Link></div>
             </div>
        </>
    )
}
export default Index