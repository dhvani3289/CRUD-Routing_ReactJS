import { Link } from 'react-router-dom';
import './Header.css'
function Header() {
    return (
        <>
            <div className="header">
                <Link to="/">ADD DATA</Link>
                <Link to="/ShowData">SHOW RECORDS</Link>
            </div>
        </>
    )
}

export default Header;