
import { Link } from "react-router-dom"
import {
    FiArrowRight,
    FiBarChart2,
    FiBox,
    FiTruck,
    FiShoppingCart,
    FiMap,
    FiRefreshCw
} from "react-icons/fi"
import { useState } from "react"
import emailjs from '@emailjs/browser'

const Consulting = () => {
    const [name, setName] = useState('')
    const [company_name, setCompanyName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [phone, setPhone] = useState('')
    const [alert, setAlert] = useState(null)
    
const handleSubmit = (e) => {
        e.preventDefault()
        
       
        //EmailJS service ID, template ID, and public key
        const serviceId = 'service_wsyny93'
        const templateId = 'template_tqe19wu'
        const publicKey = 'eCS5a5yRYSaLDbX4R'

        //creating object that contains dynamic template params
        const templateParams = {
            from_name: name,
            to_email: email,
            to_name: 'Unbroken Solutions',
            company_name: company_name,
            message: message,
            phone: phone
        }

        //sending email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('Email sent successfully', response)
            setAlert({ type: 'success', message: 'Your email has been sent! We will get back to you shortly' })
            setName('')
            setCompanyName('')
            setEmail('')
            setMessage('')
            setPhone('')
        })
        .catch((error) => {
            console.error('Error sending email:', error)
            setAlert({ type: 'error', message: 'Failed to send email' })
        })
    } 

    return (
        <main className="consulting-page">

            {/* HERO */}
            <section className="consulting-hero">

                <div className="consulting-hero-content">

                    <p className="eyebrow">
                        SUPPLY CHAIN & CONSULTING
                    </p>

                    <h1>
                        Smarter logistics.
                        <br />
                        Better business.
                    </h1>

                    <p className="hero-description">
                        We help businesses improve the way they move,
                        manage and source their goods — from the warehouse
                        to the customer.
                    </p>

                    <a href="#consulting-services" className="hero-cta">
                        Explore our services
                        <FiArrowRight />
                    </a>

                </div>

            </section>


            {/* INTRO */}
            <section className="consulting-intro">

                <div className="section-label">
                    <span>01</span>
                    <p>WHAT WE DO</p>
                </div>

                <div className="consulting-intro-content">

                    <h2>
                        Your supply chain should
                        <br />
                        work for your business.
                    </h2>

                    <div>
                        <p>
                            Every business moves differently. We look at the
                            bigger picture — your operations, costs, inventory,
                            suppliers and distribution — to identify where
                            things can work better.
                        </p>

                        <p>
                            Our consulting services are designed to help you
                            reduce unnecessary costs, improve efficiency and
                            build logistics processes that can grow with your
                            business.
                        </p>
                    </div>

                </div>

            </section>


            {/* SERVICES */}
            <section
                className="consulting-services"
                id="consulting-services"
            >

                <div className="section-label">
                    <span>02</span>
                    <p>OUR SERVICES</p>
                </div>

                <div className="services-heading">

                    <h2>
                        Practical solutions
                        <br />
                        for complex operations.
                    </h2>

                    <p>
                        From day-to-day logistics challenges to long-term
                        supply chain planning, we help you make better
                        decisions.
                    </p>

                </div>


                <div className="consulting-service-grid">

                    <article className="consulting-service">

                        <FiBarChart2 />

                        <span>01</span>

                        <h3>
                            Supply Chain Solutions
                        </h3>

                        <p>
                            Identify weaknesses, remove inefficiencies and
                            build a supply chain that supports the way your
                            business actually operates.
                        </p>

                    </article>


                    <article className="consulting-service">

                        <FiBox />

                        <span>02</span>

                        <h3>
                            Warehousing
                        </h3>

                        <p>
                            Improve warehouse processes, space utilisation,
                            stock movement and overall operational efficiency.
                        </p>

                    </article>


                    <article className="consulting-service">

                        <FiBarChart2 />

                        <span>03</span>

                        <h3>
                            Logistics Strategy & Planning
                        </h3>

                        <p>
                            Develop practical logistics strategies that align
                            your transport, inventory and distribution with
                            your business goals.
                        </p>

                    </article>


                    <article className="consulting-service">

                        <FiBox />

                        <span>04</span>

                        <h3>
                            Inventory Management
                        </h3>

                        <p>
                            Improve stock visibility, reduce unnecessary
                            holding costs and keep the right products moving
                            at the right time.
                        </p>

                    </article>


                    <article className="consulting-service">

                        <FiTruck />

                        <span>05</span>

                        <h3>
                            Transport & Fleet Optimization
                        </h3>

                        <p>
                            Review routes, fleet utilisation and transport
                            operations to help reduce costs and improve
                            reliability.
                        </p>

                    </article>


                    <article className="consulting-service">

                        <FiShoppingCart />

                        <span>06</span>

                        <h3>
                            Procurement & Sourcing Support
                        </h3>

                        <p>
                            Strengthen supplier relationships, sourcing
                            processes and purchasing decisions while keeping
                            cost and reliability in balance.
                        </p>

                    </article>


                    <article className="consulting-service">

                        <FiMap />

                        <span>07</span>

                        <h3>
                            Distribution Network Design
                        </h3>

                        <p>
                            Evaluate how goods move through your network and
                            identify opportunities to improve speed, cost and
                            coverage.
                        </p>

                    </article>


                    <article className="consulting-service">

                        <FiRefreshCw />

                        <span>08</span>

                        <h3>
                            Reverse Logistics Solutions
                        </h3>

                        <p>
                            Build better processes for returns, exchanges,
                            recovery and the movement of goods back through
                            your supply chain.
                        </p>

                    </article>

                </div>

            </section>


            {/* APPROACH */}
            <section className="consulting-approach">

                <div className="section-label">
                    <span>03</span>
                    <p>OUR APPROACH</p>
                </div>

                <div className="approach-heading">

                    <h2>
                        Understand first.
                        <br />
                        Improve second.
                    </h2>

                </div>


                <div className="approach-grid">

                    <div className="approach-item">

                        <span>01</span>

                        <h3>
                            Understand
                        </h3>

                        <p>
                            We start by understanding your operation,
                            challenges and objectives.
                        </p>

                    </div>


                    <div className="approach-item">

                        <span>02</span>

                        <h3>
                            Analyse
                        </h3>

                        <p>
                            We look at the processes, costs and movement of
                            goods to identify where improvements can be made.
                        </p>

                    </div>


                    <div className="approach-item">

                        <span>03</span>

                        <h3>
                            Improve
                        </h3>

                        <p>
                            We turn our findings into practical solutions
                            that can actually be implemented.
                        </p>

                    </div>

                </div>

            </section>


            {/* WHY UNBROKEN */}
            <section className="consulting-why">

                <div className="why-content">

                    <p className="eyebrow">
                        WHY UNBROKEN
                    </p>

                    <h2>
                        Logistics isn't just
                        <br />
                        about moving things.
                    </h2>

                    <p>
                        It's about moving them efficiently, reliably and at
                        the right cost. Our approach connects the operational
                        side of logistics with the commercial side of your
                        business.
                    </p>

                </div>

            </section>


            {/* CONTACT / EMAIL FORM */}
            <section className="consulting-contact">

                <div className="contact-heading">

                    <p className="eyebrow">
                        LET'S TALK
                    </p>

                    <h2>
                        Have a logistics
                        <br />
                        challenge?
                    </h2>

                    <p>
                        Tell us what you're working on and we'll get back to
                        you with the next steps.
                    </p>

                </div>


                <form onSubmit={handleSubmit}
                className="consulting-form">

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
                            Tell us a little more
                        </label>

                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows="6"
                            placeholder="Tell us about your logistics challenge..."
                        />

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

export default Consulting

