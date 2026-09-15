import { Link } from "react-router-dom";
import "./NavModal.css";
const NavModal = ({ activeModal, closeNavigation }) => {
  if (!activeModal) {
    return null;
  }

  return (
    <>
      <div className="nav-modal">
        {activeModal === "services" && (
          <div className="services-modal">
            <div className="service-column">
              <h2>Shipping</h2>
              <div className="service-links">
                <Link to="/ShippingServices" onClick={closeNavigation}>
                  Shipping Services
                </Link>
                <Link to="/RoadFormOne" onClick={closeNavigation}>
                  Get Shipping Quote
                </Link>
              </div>
            </div>
            <div className="service-column">
              <h2>Consulting</h2>
              <div className="service-links">
                <Link to="/Consulting" onClick={closeNavigation}>
                  Consulting{" "}
                </Link>
                {/*}
                            <Link onClick={closeNavigation}
                            >Get Consultation</Link> */}
                {/*link it to an email form, or straight to the email form on consulting page */}
              </div>
            </div>
            <div className="service-column">
              <h2>Ink & Printing</h2>
              <div className="service-links">
                <Link to="/InkAndPrinting" onClick={closeNavigation}>
                  Ink & Printing{" "}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavModal;
