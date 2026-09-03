import updatedlogo from '../assets/updatedlogo.png'
import { Link, useLocation } from "react-router-dom"
import { useState } from 'react';
import NavModal from './NavModal';
import { FiMenu } from 'react-icons/fi';
const Navbar = () => {
const location = useLocation()

    const [activeModal, setActiveModal] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleModal = (modal) => {
        if (activeModal === modal) {
            setActiveModal(null);
        } else {
            setActiveModal(modal);
        }
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }

return(<>

    <header>

    <div className="navbar">

    <div className='brand'>

    
    <Link onClick={closeMobileMenu}>
        <img 
        className='logo-image' 
        src={updatedlogo} alt="logo"/>
        </Link>
    </div>
    

            {/*to only show services
            {location.pathname === "/" && (
                <Link to="/admin" className='navlink'>Admin</Link>
            )}
                */}
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
            <button className='navlink nav-button' 
            onClick={() => toggleModal('services')}>
                Services </button>

            <button className='navlink nav-button' 
            onClick={() => toggleModal('Ink & Printing')}>
                Ink & Printing </button>
    
    
    </div>
     {/*busy with the hamburger menu*/}

    
    </header>
    {/*Modal appears below*/}
    <NavModal activeModal={activeModal} />
    </>
)
}
export default Navbar
/*<h1>Unbroken Solutions</h1>

{/*to only show services*//*
    {location.pathname === "/" && (
        <Link to="/services" className='navlink'>Services</Link>
    )}*/
