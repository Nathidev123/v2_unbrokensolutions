import { FaPhone } from "react-icons/fa6";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-company">
          <h3>Unbroken Solutions</h3>
          <p>Logistics. Delivered with confidence</p>
        </div>

        <div className="footer-contact">
          <a href="tel:0608757163">
            <FaPhone className="phone-icon" size={17} />
            060 875 7163
          </a>
          <a href="/ShippingServices">Shipping Services</a>

          <a href="/Consulting">Consulting</a>

          <a href="/InkAndPrinting">Ink & Printing</a>

          <a href="/RoadFormOne">Create A Shipment</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Unbroken Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
