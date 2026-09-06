import { LuShip } from "react-icons/lu";
import { Link } from "react-router-dom"
import Services from '../assets/services.png'
import UBCourier from '../assets/UBCourier.png'
import {
    FiPackage,
    FiTruck,
    FiSend
} from "react-icons/fi"
const ShippingServices = () => {

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
                        Choose the service that best suits your shipment,
                        destination and delivery requirements.
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
                        What information do we need?
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

        </main>
    )
}

export default ShippingServices