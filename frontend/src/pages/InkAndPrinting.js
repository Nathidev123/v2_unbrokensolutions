
import {
    FiArrowRight,
    FiTruck,
    FiPrinter,
    FiCheckCircle,
    FiTool
} from "react-icons/fi"
import { useState } from "react"
import emailjs from '@emailjs/browser'

import InkImage from '../assets/ink.jpg'
import PrinterImage from '../assets/repairs.jpg'
import './InkAndPrintingCss.css'

const InkAndPrinting = () => {

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
        <main className="ink-printing-page">

            {/* HERO */}
            <section className="ink-hero">

                <div className="ink-hero-content">

                    <p className="eyebrow">
                        INK & PRINTING
                    </p>

                    <h1>
                        Quality ink.
                        <br />
                        Reliable printing.
                    </h1>

                    <p className="hero-description">
                        High-quality printing supplies, convenient delivery
                        and reliable printer support for businesses that
                        depend on their printers every day.
                    </p>

                    <a href="#ink-services" className="hero-cta">
                        Explore our services
                        <FiArrowRight />
                    </a>

                </div>

            </section>


            {/* INTRO */}
            <section className="ink-intro" id="ink-services">

                <div className="section-label">
                    <span>01</span>
                    <p>INK & SUPPLIES</p>
                </div>

                <div className="ink-intro-content">

                    <div>

                        <h2>
                            The right ink
                            <br />
                            for your printer.
                        </h2>

                    </div>

                    <div>

                        <p>
                            We supply high-quality inks and printing
                            consumables compatible with all major printer
                            brands. Whether you are running a home office,
                            a growing business or a busy professional
                            environment, we help keep your printers
                            running without interruption.
                        </p>

                        <p>
                            From everyday printing to demanding business
                            requirements, our focus is on quality,
                            reliability and getting the right products
                            to you when you need them.
                        </p>

                    </div>

                </div>

            </section>


            {/* IMAGE + DELIVERY */}
            <section className="ink-feature">

                <div className="ink-feature-image">

                    <img
                        src={InkImage}
                        alt="Printer ink and printing supplies"
                    />

                </div>

                <div className="ink-feature-content">

                    <p className="eyebrow">
                        DELIVERY
                    </p>

                    <h2>
                        Your ink,
                        <br />
                        delivered.
                    </h2>

                    <p>
                        Running out of ink should not bring your business
                        to a standstill. We offer delivery of printing
                        supplies directly to you, making it easier to keep
                        the products you need on hand.
                    </p>

                    <p>
                        Tell us what you need, where you are located and
                        what printer you use, and we can help you find
                        the right solution.
                    </p>

                    <div className="ink-feature-points">

                        <div>
                            <FiCheckCircle />
                            <span>Quality printing supplies</span>
                        </div>

                        <div>
                            <FiCheckCircle />
                            <span>Compatible with major brands</span>
                        </div>

                        <div>
                            <FiTruck />
                            <span>Convenient delivery</span>
                        </div>

                    </div>

                </div>

            </section>


            {/* PRINTER REPAIRS */}
            <section className="printer-repairs">

                <div className="section-label">
                    <span>02</span>
                    <p>PRINTER REPAIRS</p>
                </div>

                <div className="printer-repairs-heading">

                    <h2>
                        When your printer
                        <br />
                        stops working,
                        <br />
                        we can help.
                    </h2>

                    <p>
                        We don't only supply ink. We also provide printer
                        repair and support to help get your equipment back
                        into operation.
                    </p>

                </div>


                <div className="printer-repairs-feature">

                    <div className="printer-repairs-content">

                        <FiTool />

                        <h3>
                            Printer repair & support
                        </h3>

                        <p>
                            From everyday printing problems to equipment
                            that has stopped working altogether, we can
                            assess the issue and help get your printer
                            operating again.
                        </p>

                        <p>
                            Our goal is simple — minimise downtime and
                            keep your business moving.
                        </p>

                    </div>

                    <div className="printer-repairs-image">

                        <img
                            src={PrinterImage}
                            alt="Printer repair and maintenance"
                        />

                    </div>

                </div>

            </section>


            {/* WHY UNBROKEN */}
            <section className="ink-why">

                <div className="ink-why-content">

                    <p className="eyebrow">
                        WHY UNBROKEN
                    </p>

                    <h2>
                        Printing shouldn't
                        <br />
                        slow you down.
                    </h2>

                    <p>
                        Whether you need ink, delivery or printer repairs,
                        we aim to make the process straightforward.
                        Instead of dealing with multiple suppliers for
                        different printing needs, Unbroken brings these
                        services together in one place.
                    </p>

                </div>


                <div className="ink-why-grid">

                    <div className="ink-why-item">

                        <FiPrinter />

                        <h3>
                            Quality products
                        </h3>

                        <p>
                            High-quality inks and printing supplies for
                            major printer brands.
                        </p>

                    </div>


                    <div className="ink-why-item">

                        <FiTruck />

                        <h3>
                            Delivery
                        </h3>

                        <p>
                            Get your printing supplies delivered directly
                            to your business or location.
                        </p>

                    </div>


                    <div className="ink-why-item">

                        <FiTool />

                        <h3>
                            Printer support
                        </h3>

                        <p>
                            Repair and support when your printer isn't
                            performing as it should.
                        </p>

                    </div>

                </div>

            </section>


            {/* CONTACT */}
            <section className="ink-contact">

                <div className="contact-heading">

                    <p className="eyebrow">
                        LET'S TALK
                    </p>

                    <h2>
                        Need ink?
                        <br />
                        Need a printer fixed?
                    </h2>

                    <p>
                        Tell us what you need and we'll get back to you
                        with the right solution.
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
                            Tell us what you need
                        </label>

                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows="6"
                            placeholder="Tell us about the ink you need or the printer you're having trouble with..."
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

export default InkAndPrinting

