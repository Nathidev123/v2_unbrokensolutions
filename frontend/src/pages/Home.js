import log from "../assets/log.png"
import logo2 from "../assets/logo2.png"
import { Link } from "react-router-dom"
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoMdTime } from "react-icons/io";
import { LiaHandsSolid } from "react-icons/lia";
import { GiReceiveMoney } from "react-icons/gi";
const Home = () => {

    return(<>
        <Link to={"/shipment"}>Create Shipment</Link>
        <div className="home-container">
        <div className="main-content">
           <h1>Unbroken performance. Unbroken commitment. Reliable service.</h1> 
            <p>Gain a competitive edge with our trusted services. Browse our catalogue and get in touch to discover how we can help your business succeed.
            </p>
            <Link to="/services" className='contact-button'>Browse Services</Link>
            
            
        </div>
        <img src={logo2} alt="truck-image" className="truck-image" />
        </div>


        <h1>Why Unbroken Solutions?</h1>
        <div className="why-section">
            <p>At Unbroken Solutions, we believe that great service is built on reliability, efficiency, and long-term partnerships. We understand that businesses depend on seamless operations to remain competitive, which is why we provide tailored solutions designed to keep your organization moving forward.
             From logistics and supply chain support to printer solutions, repairs, and consumables, our team is committed to delivering services that combine quality, affordability, and exceptional customer care. We focus on understanding your unique requirements and providing practical, cost-effective solutions that help improve productivity and reduce operational challenges.
            Our commitment to professionalism, on-time delivery, and customer satisfaction has earned us the trust of businesses across various industries. Whether you need dependable logistics support, expert consulting, or reliable printing solutions, Unbroken Solutions is dedicated to helping you achieve your goals with confidence.
            Unbroken Solutions as your trusted partner and gain access to a team that values integrity, innovation, and results. Together, we turn challenges into opportunities and deliver solutions that drive lasting business success.
        </p>
        </div>


        <h1>Our Values</h1>
        <div className="trust-section">
            
            <div className="trust-item">
            <VscWorkspaceTrusted className="icons"/>
            <p>We deliver on our promises.
            </p>
            </div>

            <div className="trust-item">
            <IoMdTime  className="icons"/>
            <p>Punctuality you can count on.
            </p>
            </div>

            <div className="trust-item">
            <LiaHandsSolid  className="icons"/>
            <p>Your cargo is safe with us.
            </p>
            </div>

            <div className="trust-item">
            <GiReceiveMoney  className="icons"/>
            <p>Competitive rates backed by quality.
            </p>
            </div>
        </div>


        <div className="about-info">
            <img src={log} alt="containers" className="container-image"/>
            <h1>About Us</h1>
            <p> 

            </p>
            Unbroken Solutions is a trusted provider of logistics, consulting, and printing solutions, committed to helping businesses operate more efficiently and grow with confidence. From freight and supply chain support to printer repairs and quality ink supplies, we deliver reliable, cost-effective services tailored to our clients' needs.
             Our focus is on building long-term partnerships through professional service, practical solutions, and a commitment to excellence. With a customer-first approach and a reputation for reliability, Unbroken Solutions helps businesses overcome challenges, improve performance, and move forward with confidence.


        </div>
        
        <div className="email-div">
        <Link to={'/emailForm'} className='email-button'>Email Us!</Link>
        </div>
        
        
        </>
    )
}

export default Home