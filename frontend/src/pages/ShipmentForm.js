import { useState } from "react"
import { useOrderContext } from '../hooks/useOrderContext'

const ShipmentForm = () => {

    //accessing global state
    
    const { dispatch } = useOrderContext()


    const [company_name, setCompanyName] = useState('')
    const [contact_name, setContactName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [street_address, setstreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [postal_code, setPostalCode] = useState('')
    const [province, setProvince] = useState('')

    
    const [recipient_company, setRecCompany] = useState('')
    const [recipient_name, setRecName] = useState('')
    const [recipient_email, setRecEmail] = useState('')
    const [recipient_phone, setRecPhone] = useState('')
    const [recipient_street_address, setRecStreetAddress] = useState('')
    const [recipient_city, setReCity] = useState('')
    const [recipient_province, setRecProvince] = useState('')


    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')

    const [package_contents, setPackageContents] = useState('')
    const [parcel_value, setParcelValue] = useState('')
    const [package_name, setPackageName] = useState('')
    const [shipment_options, setShipmentOptions] = useState('')
    //error to states
    const [error, setError] = useState(null)
    
    //after refactoring error
    const [emptyFields, setEmptyFields] = useState([])

   const handleSubmit = async (e) => {
        e.preventDefault()

        //creating post request
        //states need to match with the names in the controller 
        const order = {
        company_name, contact_name, email, phone, street_address,
        city, postal_code, province, recipient_company, recipient_name,
        recipient_email,recipient_phone, recipient_street_address,
        recipient_city, recipient_province,
        weight, height, length, width, package_contents, parcel_value,
        package_name, shipment_options

   }
        const response = await fetch('/api/order/', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)
        //checking response
        if(!response.ok) {
            setError(json.error) //from controller
            setEmptyFields(json.emptyFields || [])
        }
        if(response.ok) {
            setCompanyName('')
            setContactName('')
            setEmail("")
            setPhone('')
            setstreetAddress('')
            setCity('')
            setPostalCode('')
            setProvince('')

            setRecCompany('')
            setRecName("")
            setRecEmail('')
            setRecPhone('')
            setRecStreetAddress('')
            setReCity('')
            setRecProvince('')

            setWeight('')
            setHeight("")
            setLength('')
            setWidth('')

            setPackageContents('')
            setParcelValue('')
            setPackageName('')
            setShipmentOptions('')

            setError(null)
            setEmptyFields([])

            console.log('new card added', json)

            dispatch({type: 'CREATE_ORDER', payload: json})
        }
   }
    return(
        <>
        <form className="shipmentForm" onSubmit={handleSubmit}>
        <div>
            
            <h1>Create a Shipment</h1>
            <label>Company Name:</label>
            <input onChange={(e) => setCompanyName(e.target.value)}
            value={company_name}
            className={emptyFields.includes('company_name') ? 'error' : ''}/>

            <label>Contact Name:</label>
            <input onChange={(e) => setContactName(e.target.value)}
            value={contact_name}
            className={emptyFields.includes('contact_name') ? 'error' : ''}/>

            <label>Email:</label>
            <input onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes('email') ? 'error' : ''}/>

            <label>Phone:</label>
            <input onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className={emptyFields.includes('phone') ? 'error' : ''}/>

            <label>Street Address:</label>
            <input onChange={(e) => setstreetAddress(e.target.value)}
            value={street_address}
            className={emptyFields.includes('street_address') ? 'error' : ''}/>

            <label>City:</label>
            <input onChange={(e) => setCity(e.target.value)}
            value={city}
            className={emptyFields.includes('city') ? 'error' : ''}/>

            <label>Postal Code:</label>
            <input onChange={(e) => setPostalCode(e.target.value)}
            value={postal_code}
            className={emptyFields.includes('postal_code') ? 'error' : ''}/>

            <label>Province:</label>
            <input onChange={(e) => setProvince(e.target.value)}
            value={province}
            className={emptyFields.includes('province') ? 'error' : ''}/>


            <h1>Recipient</h1>
            <label>Recipient Company:</label>
            <input onChange={(e) => setRecCompany(e.target.value)}
            value={recipient_company}
            className={emptyFields.includes('recipient_company') ? 'error' : ''}/>

            <label>Name:</label>
            <input onChange={(e) => setRecName(e.target.value)}
            value={recipient_name}
            className={emptyFields.includes('recipient_name') ? 'error' : ''}/>

            
            <label>Email:</label>
            <input onChange={(e) => setRecEmail(e.target.value)}
            value={recipient_email}
            className={emptyFields.includes('recipient_email') ? 'error' : ''}/>

            <label>Phone:</label>
            <input onChange={(e) => setRecPhone(e.target.value)}
            value={recipient_phone}
            className={emptyFields.includes('recipient_phone') ? 'error' : ''}/>

            <label>Street Address:</label>
            <input onChange={(e) => setRecStreetAddress(e.target.value)}
            value={recipient_street_address}
            className={emptyFields.includes('recipient_street_address') ? 'error' : ''}/>

            <label>City:</label>
            <input onChange={(e) => setReCity(e.target.value)}
            value={recipient_city}
            className={emptyFields.includes('recipient_city') ? 'error' : ''}/>


            <label>Province:</label>
            <input onChange={(e) => setRecProvince(e.target.value)}
            value={recipient_province}
            className={emptyFields.includes('recipient_province') ? 'error' : ''}/>

    

            <h1>Packaging</h1>
            <label>Weight:</label>
            <input onChange={(e) => setWeight(e.target.value)}
            value={weight}
            className={emptyFields.includes('weight') ? 'error' : ''}/>

            <label>Height:</label>
            <input onChange={(e) => setHeight(e.target.value)}
            value={height}
            className={emptyFields.includes('height') ? 'error' : ''}/>

            <label>Length:</label>
            <input onChange={(e) => setLength(e.target.value)}
            value={length}
            className={emptyFields.includes('length') ? 'error' : ''}/>

            <label>Width:</label>
            <input onChange={(e) => setWidth(e.target.value)}
            value={width}
            className={emptyFields.includes('width') ? 'error' : ''}/>


            <h1>Package Details</h1>
            <label>Package Contents:</label>
            <input onChange={(e) => setPackageContents(e.target.value)}
            value={package_contents}
            className={emptyFields.includes('package_contents') ? 'error' : ''}/>

            <label>Parcel Value:</label>
            <input onChange={(e) => setParcelValue(e.target.value)}
            value={parcel_value}
            className={emptyFields.includes('parcel_value') ? 'error' : ''}/>

            <label>Package Name:</label>
            <input onChange={(e) => setPackageName(e.target.value)}
            value={package_name}
            className={emptyFields.includes('package_name') ? 'error' : ''}/>

            <label>Shipment Options:</label>
            <input onChange={(e) => setShipmentOptions(e.target.value)}
            value={shipment_options}
            className={emptyFields.includes('shipment_options') ? 'error' : ''}/>
            <button>Submit</button>
            {error && <div className="error">{error}</div>}
           </div>
            </form>
        
        </>
    )
}

export default ShipmentForm