import { LuShip } from "react-icons/lu";
import { Link } from "react-router-dom"
import Services from '../assets/services.png'
import UBCourier from '../assets/UBCourier.png'
import { useState } from "react"
import emailjs from '@emailjs/browser'
import {
    FiArrowRight,
    FiPackage,
    FiTruck,
    FiSend
} from "react-icons/fi"
import './ShippingServices.css'
const ShippingServices = () => {
    
        
        const [name, setName] = useState('')
        const [company_name, setCompanyName] = useState('')
        const [email, setEmail] = useState('')
        const [message, setMessage] = useState('')
        const [phone, setPhone] = useState('')
        const [privacyConsent, setPrivacyConsent] = useState(false)
        const [alert, setAlert] = useState(null)
    
    
        const handleSubmit = (e) => {
            e.preventDefault()
            
            if(!privacyConsent){
                setAlert({
                    type: 'error',
                    message: 'Please agree to the Privacy Policy before submitting your enquiry'
                })
                return
            }
            const serviceId = 'service_wsyny93'
            const templateId = 'template_tqe19wu'
            const publicKey = 'eCS5a5yRYSaLDbX4R'
    
            const templateParams = {
                from_name: name,
                to_email: email,
                to_name: 'Unbroken Solutions',
                company_name: company_name,
                message: message,
                phone: phone
            }
    
            emailjs.send(serviceId, templateId, templateParams, publicKey)
                .then((response) => {
                    console.log('Email sent successfully', response)
    
                    setAlert({
                        type: 'success',
                        message: 'Your enquiry has been sent! We will get back to you shortly.'
                    })
    
                    setName('')
                    setCompanyName('')
                    setEmail('')
                    setMessage('')
                    setPhone('')
                    setPrivacyConsent(false)
                })
                .catch((error) => {
                    console.error('Error sending email:', error)
    
                    setAlert({
                        type: 'error',
                        message: 'Failed to send enquiry. Please try again.'
                    })
                })
        }
    
    return (
        
        <main className="shipping-services">

            
            <section className="shipping-hero">
                
                <div className="shipping-hero-content">
                    <p className="eyebrow">SHIPPING SERVICES</p>

                    <h1>
                        Shipping made simple.
                        <br />
                        Wherever you need to go.
                    </h1>

                    <p>
                        From local courier deliveries to road, air and sea freight,
                        Unbroken Solutions connects your business with reliable
                        shipping solutions at competitive rates.
                    </p>

                    <Link to='/RoadFormOne'>
                    Get a Quote
                    </Link>
                </div>

                <div className="shipping-hero-image">
                    <img src={Services}
                     alt="Unbroken Solutions shipping services" />
                </div>

            </section>


            
            <section className="services-section">

                <div className="section-heading">
                    <p className="eyebrow">WHAT WE OFFER</p>

                    <h2>
                        Shipping solutions for every need.
                    </h2>

                    <p>
                        We offer a range of shipping solutions, including local courier 
                        deliveries and road, air and sea freight.


                    </p>  
                </div>


                    <div className="service-card">
                        <h3>Road Freight</h3>
                        <FiTruck className="service-icons"/>
                        <p>
                            Reliable road transportation for larger
                            shipments across South Africa and beyond.
                        </p>

                        
                    </div>


                    <div className="service-card">
                        <h3>Air Freight</h3>
                        <FiSend className="service-icons"/>
                        <p>
                            Fast international shipping when time is
                            critical and your cargo needs to move quickly.
                        </p>

                        
                    </div>


                    <div className="service-card">
                        <h3>Sea Freight</h3>
                        <LuShip className="serive-icons"/>
                        <p>
                            Cost-effective solutions for larger
                            international shipments by sea.
                        </p>

                        
                    </div>
                 <div className="services">

                    <div className="service-card">
                        
                        <FiPackage className="service-icons"/>
                        <h3>Courier</h3>
                        <p>
                            Fast and convenient local deliveries for
                            parcels, documents and smaller shipments.
                        </p>

                        <img 
                        src={UBCourier}
                        alt="Unbroken Solutions Courier Vehicle"
                        className="service-card-image"/>
                    </div>
                </div>

            </section>


            {/* How the process works */}
            <section className="how-it-works">

                <div className="section-heading">
                    <p className="eyebrow">HOW IT WORKS</p>

                    <h2>
                        From quote to delivery.
                    </h2>
                </div>


                <div className="steps">

                    <div className="step">
                        <span>01</span>
                        <h3>Tell us what you need</h3>
                        <p>
                            Provide your shipment details, collection
                            address and destination.
                        </p>
                    </div>


                    <div className="step">
                        <span>02</span>
                        <h3>Get your quote</h3>
                        <p>
                            We calculate your shipping requirements and
                            provide you with a competitive quotation.
                        </p>
                    </div>


                    <div className="step">
                        <span>03</span>
                        <h3>We arrange the shipment</h3>
                        <p>
                            Once approved, we arrange the appropriate
                            transportation for your shipment.
                        </p>
                    </div>


                    <div className="step">
                        <span>04</span>
                        <h3>Your shipment arrives</h3>
                        <p>
                            Your goods are transported to their destination
                            safely and efficiently.
                        </p>
                    </div>

                </div>

            </section>


            {/* Shipping Requirements */}
            <section className="requirements">

                <div className="section-heading">
                    <p className="eyebrow">BEFORE YOU SHIP</p>

                    <h2>
                        What your shipment requires.
                    </h2>

                    <p>
                        The requirements can vary depending on the type
                        of shipment and service selected.
                    </p>
                </div>


                <div className="requirements-grid">

                    <div>
                        <h3>Courier</h3>
                        <ul>
                            <li>Pickup address</li>
                            <li>Delivery address</li>
                            <li>Package dimensions</li>
                            <li>Package weight</li>
                            <li>Package contents</li>
                        </ul>
                    </div>


                    <div>
                        <h3>Road Freight</h3>
                        <ul>
                            <li>Pickup and delivery locations</li>
                            <li>Cargo description</li>
                            <li>Weight and dimensions</li>
                            <li>Shipment type</li>
                        </ul>
                    </div>


                    <div>
                        <h3>Air Freight</h3>
                        <ul>
                            <li>Origin and destination</li>
                            <li>Cargo details</li>
                            <li>Weight and dimensions</li>
                            <li>Commercial documentation</li>
                        </ul>
                    </div>


                    <div>
                        <h3>Sea Freight</h3>
                        <ul>
                            <li>Port of origin</li>
                            <li>Destination port</li>
                            <li>Cargo details</li>
                            <li>Container requirements</li>
                            <li>Shipping documentation</li>
                        </ul>
                    </div>

                </div>

            </section>


            {/* Final CTA */}
            <section className="shipping-cta">

                <h2>
                    Ready to move your shipment?
                </h2>

                <p>
                    Get a quote from Unbroken Solutions and let us
                    find the right shipping solution for you.
                </p>

                <Link to='/RoadFormOne'>
                    Get a Quote
                </Link>

           
            </section>

           
            {/* CONTACT */}
            <section className="shipping-contact">

                <div className="contact-heading">

                    <p className="eyebrow">
                        LET'S TALK SHIPPING
                    </p>

                    <h2>
                        Planning a shipment?
                        <br />
                        Not sure where to start?
                    </h2>

                    <p>
                        Tell us what you're looking to move and where it needs to go.
                        Whether you're ready for a quote or just have a question,
                        we'll help you find the right shipping solution.
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="consulting-form"
                >

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="name">
                                Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="company">
                                Company
                            </label>

                            <input
                                type="text"
                                id="company"
                                value={company_name}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Company name"
                            />

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="phone">
                                Phone
                            </label>

                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone number"
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label htmlFor="message">
                            How can we help?
                        </label>

                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows="6"
                            placeholder="Tell us what you're looking to ship, where it's going, or anything you'd like to ask about our shipping services..."
                        />

                    </div>

                    <div className="privacy-consent">
                    <label className="privacy-checkbox">
                    <input
                        type="checkbox"
                        name="privacyConsent"
                        checked={privacyConsent || false}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                    />

                    <span>
                        I have read and agree to the{" "}
                        <a href="/PrivacyPolicy" 
                        target="_blank" 
                        rel="noreferrer">
                            Privacy Policy
                        </a>
                        .
                    </span>
                </label>
            </div>    

                    <button
                        type="submit"
                        className="contact-submit"
                    >
                        Send enquiry
                        <FiArrowRight />
                    </button>


                    {alert && (
                        <div className={`alert alert-${alert.type}`}>
                            {alert.message}
                        </div>
                    )}

                </form>

            </section>



        </main>
    )
}

export default ShippingServices