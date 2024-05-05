import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1>Tatranský závody ovcí</h1>
                <div><Link to="/settings">Hrát</Link></div>
                <div><Link to="/rules">Rules</Link></div>
             </div>
        </>
    )
}
export default Index