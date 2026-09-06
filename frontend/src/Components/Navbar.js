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

    
    <Link to='/'
     onClick={closeMobileMenu}>
        <img 
        className='logo-image' 
        src={updatedlogo} alt="logo"/>
        </Link>
    </div>
    
            
            <div className='desktop-nav'>
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
                Ink & Printing 
            </button>
            </div>
        
        {/*busy with the hamburger menu*/}
     <button className='hamburger'
     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
     aria-label='Open navigation menu'
     >
        <FiMenu />
     </button>
     
    </div>
     
    
    </header>


    {mobileMenuOpen && (
    <div className="mobile-menu">

        {location.pathname !== "/" && (
            <Link
                to="/"
                className="mobile-navlink"
                onClick={closeMobileMenu}
            >
                Home
            </Link>
        )}

        <button
            className="mobile-navlink"
            onClick={() => {
                toggleModal('services');
                closeMobileMenu();
            }}
        >
            Services
        </button>

        <button
            className="mobile-navlink"
            onClick={() => {
                toggleModal('Ink & Printing');
                closeMobileMenu();
            }}
        >
            Ink & Printing
        </button>

    </div>
)}
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
