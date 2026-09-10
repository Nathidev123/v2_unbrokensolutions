import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import './Footer.css'
const Footer = () => {

    return(
        
        <footer>
        <div className="footer">
         
         <div className="footer-company">
            <h3>Unbroken Solutions</h3>
            <p>Logistics. Delivered with confidence</p>
         </div>

         <div className="footer-contact">
        <a href="tel:0716488541">
            <FaPhone className="phone-icon" size={17}/>
        071 648 8541</a>

        <a href='/emailForm'>
            <MdEmail className="email-icon" size={17}/>
            info@unbrokensolutions.co.za</a>
    
        </div>
        </div>
        <div className="footer-bottom">
            <p>© 2026 Unbroken Solutions. All rights reserved.</p>

        </div>
        </footer>
    )

}

export default Footer