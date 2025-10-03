import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavigationBar(){
    return ( 
    <nav className="navigation-bar">
        <div className="navigation-bar-brand">
            <Link to='/'>Movie Program</Link>
        </div>

        <div className="navigation-bar-links">
            <Link className="navigation-bar-link" to='/'><i class="fa-solid fa-house"></i></Link>
            <Link className="navigation-bar-link" to='/favorites'><i class="fa-solid fa-heart"></i></Link>
        </div>
    </nav>
    )
}

export default NavigationBar