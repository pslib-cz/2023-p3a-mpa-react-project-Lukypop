import { Link } from 'react-router-dom';
import styles from './Index.module.css';
const Index = () => {
    return (
        <>
            <div className={styles['mainmenu']} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1>Tatranské závody ovcí</h1>
                <button style={{marginBottom: '.5em', width: '160px'}}><Link style={{textDecoration: 'none', color: 'white'}} to="/settings">Hrát</Link></button>
                <button style={{width: '160px'}}><Link style={{textDecoration: 'none', color: 'white'}} to="/Rules">Pravidla</Link></button>
             </div>
        </>
    )
}
export default Index