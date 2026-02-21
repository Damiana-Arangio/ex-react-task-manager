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
        <nav>
            <ul>
                {
                    links.map( link => (
                        <li key={link.path}> 
                            <NavLink to={link.path}> {link.label} </NavLink> 
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navbar;