/* Barra di navigazione principale */
import { NavLink } from "react-router-dom";

/*************
    COSTANTI 
*************/

// Array per generare dinamicamente i link della Navbar
const links = [
    { path: "/", label: "Lista Task" },
    { path: "/add", label: "Aggiungi Task" }
]


function Navbar() {

    /*************
        RENDER 
    *************/
    return(
        <nav className="navbar">
            <ul className="navbar-list">
                {
                    links.map(link => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navbar;