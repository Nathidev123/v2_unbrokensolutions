import { useState } from "react"
import emailjs from '@emailjs/browser'
const EmailForm = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault()
        
       
        //EmailJS service ID, template ID, and public key
        const serviceId = 'service_kd5mskc'
        const templateId = 'template_tqe19wu'
        const publicKey = 'eCS5a5yRYSaLDbX4R'

        //creating object that contains dynamic template params
        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: 'Unbroken Solutions',
            message: message,
        }

        //sending email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('Email sent successfully', response)
            setAlert({ type: 'success', message: 'Your email has been sent!, We will get back to you shortly' })
            setName('')
            setEmail('')
            setMessage('')
        })
        .catch((error) => {
            console.error('Error sending email:', error)
            window.setAlert({ type: 'error', message: 'Failed to send email' })
        })
    } 
    return(
        <form onSubmit={handleSubmit} className="emailForm">
            <h1><strong>Contact Us</strong></h1>
            <input 
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <input 
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <textarea
            cols="30"
            placeholder="Your Message"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required>
            
            </textarea>
            <button type="submit">Send Email</button>
            {alert && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.message}
                </div>
            )}
        </form>
    )

}

export default EmailForm