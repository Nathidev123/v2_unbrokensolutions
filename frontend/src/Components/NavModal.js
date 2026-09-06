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
                            <Link to='/ShippingServices' >Shipping Services</Link>
                            <Link>Get Shipping Quote</Link>
                            
                            </div>
                            </div>
                            <div className="service-column">
                            <h2>Consulting</h2>
                            <div className="service-links">
                            <Link>Consulting Services</Link>
                            <Link>Get Consultation</Link>
                            {/*link it to an email form, or straight to the email form on consulting page */}
                            
                            </div>
                        </div>
                    </div>   
                    )}
                    {activeModal === 'Ink & Printing' && (
                        <div className="printing-modal">
                            <div className="service-column">
                            <h2>Ink & Printing</h2>
                            <div className="service-links">
                            <Link>Ink & Print</Link>
                            <Link>Get In Touch</Link>
                            </div>
                            </div>
                        </div>
                    )}
                    </div>
                </>)
    }

    export default NavModal

