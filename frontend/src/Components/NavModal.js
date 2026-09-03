import { Link } from "react-router-dom";
import './NavModal.css';
    const NavModal = ({ activeModal }) => {

        if(!activeModal) {
            return null
        }


        return(<>
                <div className="nav-modal">
                    {activeModal === 'services' && (
                        <div className="services-modal">
                            <div className="service-column">
                            <h2>Shipping</h2>
                            <div className="service-links">
                            <Link>Courier & Express</Link>
                            <Link>Road Freight</Link>
                            <Link>Air Freight</Link>
                            <Link>Sea Freight</Link>
                            <Link>Courier & Express</Link>
                            </div>
                            </div>
                            <div className="service-column">
                            <h2>Consulting</h2>
                            <div className="service-links">
                            <Link>Supply Chain Consulting</Link>
                            <Link>Logistics Strategy & Planning</Link>
                            <Link>Warehouse</Link>
                            <Link>Inventory Management</Link>
                            <Link>Transportation & Fleet Optimization</Link>
                            <Link>Procurement & Sourcing Support</Link>
                            <Link>Distribution Network Design</Link>
                            <Link>Reverse Logistics Solutions</Link>
                            </div>
                        </div>
                    </div>   
                    )}
                    {activeModal === 'Ink & Printing' && (
                        <div className="printing-modal">
                            <div className="service-column">
                            <h2>Ink & Printing</h2>
                            <div className="service-links">
                            <Link>Ink Supplies</Link>
                            <Link>Printer Repairs</Link>
                            </div>
                            </div>
                        </div>
                    )}
                    </div>
                </>)
    }

    export default NavModal

