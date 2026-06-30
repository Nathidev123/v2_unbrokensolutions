import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {

    return(
        
        <footer>
        <div className="footer">
         
        <a href="tel:0716488541"><FaPhone className="phone-icon" size={17}/>071 648 8541</a>
        <br/>
        <a href='/emailForm'>
        <MdEmail className="email-icon" size={17}/>info@unbrokensolutions.co.za</a>
    
        </div>
        </footer>
    )

}

export default Footer