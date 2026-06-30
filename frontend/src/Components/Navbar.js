import updatedlogo from '../assets/updatedlogo.png'
import { Link, useLocation } from "react-router-dom"
const Navbar = () => {
const location = useLocation()

return(
    <header>
    <div className="navbar">
    <div className='brand'>
    <img className='logo-image' src={updatedlogo} alt="logo"/>
    
    </div>
    {/*to only show services*/}
    {location.pathname === "/" && (
        <Link to="/services" className='navlink'>Services</Link>
    )}

    {/*to only show services*/}
    {location.pathname === "/" && (
        <Link to="/admin" className='navlink'>Admin</Link>
    )}

    {/*to only show services*/}
    {location.pathname === "/services" && (
        <Link to="/"  className='navlink'>Home</Link>
    )}

    {/*to show on form*/}
    {location.pathname === "/emailForm" && (
        <Link to="/"  className='navlink'>Home</Link>
    )}

    {/*to show on form*/}
    {location.pathname === "/admin" && (
        <Link to="/"  className='navlink'>Home</Link>
    )}
    
    {/*to show on form*/}
    {location.pathname === "/shipment" && (
        <Link to="/"  className='navlink'>Home</Link>
    )}

    
    </div>
    
    </header>
)
}
export default Navbar
/*<h1>Unbroken Solutions</h1>*/