import { useFormContext } from "../hooks/useFormContext"
import { useNavigate } from "react-router-dom" 
import { useState } from "react"
import './Forms.css'
const RoadFormOne = () => {
    const navigate = useNavigate()
    const { formData, emptyFields, dispatch2 } = useFormContext()
    //const { emptyFields, setEmptyFields } = useState([])
    const [ error, setError ] = useState(null)


    //formContext update function
    //monitoring changes
    const handleChange = (e) => {

        dispatch2({
            type: "UPDATE_FIELD",
            field: e.target.name,
            value: e.target.value
        })
    }




    const handleSubmit = () => {
        navigate('/RoadFormTwo')
    }
    //create emptyFields section
    return(<>
        <div className="form-page">
            <div className="form-card">
        <form>
        <div className="form-header">
            <div className="form-progress">
                <div className="progress-fill"
                style={{ width: "50%" }}
                ></div>

                
                <div className="form-group">
                    <h1>Ship Form</h1>
                    
                    <input 
                    placeholder="Company Name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className={emptyFields.includes('company_name') ? 'error': ''}
                    />
                </div>

                <div className="form-group">
                    <input 
                    placeholder="Contact Name"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    className={emptyFields.includes('contact_name') ? 'error': ''}
                    />
                </div>

                <div className="form-group">
                    <input 
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={emptyFields.includes('email') ? 'error': ''}
                    />
                </div>

                <div className="form-group">
                    <input 
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={emptyFields.includes('phone') ? 'error': ''}
                    />
                </div>

 
                <div className="form-group">
                    <h1>Ship To</h1>
                    <input 
                    placeholder="Recipient Company"
                    name="recipient_company"
                    value={formData.recipient_company}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_company') ? 'error': ''}
                    />
                </div>

                <div className="form-group">
                    <input 
                    placeholder="Recipient Name"
                    name="recipient_name"
                    value={formData.recipient_name}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_name') ? 'error': ''}
                    />
                </div>

                <div className="form-group">
                    <input 
                    placeholder="Recipient Email"
                    name="recipient_email"
                    value={formData.recipient_email}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_email') ? 'error': ''}
                    />
                </div>

                <div className="form-group">
                    <input 
                    placeholder="Recipient Phone"
                    name="recipient_phone"
                    value={formData.recipient_phone}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_phone') ? 'error': ''}
                    />
                </div>



            </div>
        </div> 
        </form>
                <button className="form-btn"
                onClick={handleSubmit}>
                    Continue
                </button>
        </div>
        </div>
        </>)
}


export default RoadFormOne