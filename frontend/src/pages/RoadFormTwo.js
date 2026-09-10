import { useState, useEffect } from "react"
import { useFormContext } from "../hooks/useFormContext"
import { useNavigate } from "react-router-dom"
import { useOrderContext } from "../hooks/useOrderContext"

import './RoadFormTwoCss.css'
//import Quotation from "../Components/Quotation"


const RoadFormTwo = () => {
    const navigate = useNavigate()
    const { orders, dispatch } = useOrderContext()
    const { formData, emptyFields,  dispatch2 } = useFormContext()
    //const { emptyFields, setEmptyFields } = useState([])
    const [ error, setError ] = useState(null)
    //const [showQuotation, setShowQuotation] = useState(false)

    
    const [alert, setAlert] = useState('');
    const [message, setMessage] = useState('');
    const pickupAddress = `${formData.street_address}, ${formData.city}, ${formData.province},South Africa`
    const dropOffAddress = `${formData.recipient_street_address}, ${formData.recipient_city}, ${formData.recipient_province},South Africa`
    
    const [distance, setDistance] = useState(null)
    const [duration, setDuration] = useState(null)
    const weight = formData.weight

    //for airports
    const[airportResults, setAirportResults] = useState([])
    const[airportSearch, setAirportSearch] = useState('')
    const [loadingAirPorts, setLoadingAirPorts] = useState(false)

    //for sea ports
    const[seaportResults, setSeaportResults] = useState([])
    const[seaportSearch, setSeaportSearch] = useState('')
    const [loadingSeaPorts, setLoadingSeaPorts] = useState(false)

    const [loadingSubmit, setLoadingSubmit] = useState(false)
    //forgot to add loading state in commit message
    //moved from quotation
    const getDistance = async () => {
    //sendin req to backend
    const response = await fetch('/api/order/distance', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            pickupAddress,
            dropOffAddress
        })

    })
    //recieving response from backend
    const json = await response.json()

    if (response.ok) {
        console.log("PICKUP:", pickupAddress)
        console.log("DROPOFF:", dropOffAddress)
        setDistance(json.distance)
        setDuration(json.duration)
        console.log(json)

        return {
            distance: json.distance,
            duration: json.duration
        }
        
    } else {
        setError(json.error || 'Failed to calculate distance')
        
        return null
    }

}

    

    //monitoring changes
    const handleChange = (e) => {

        dispatch2({
            type: "UPDATE_FIELD",
            field: e.target.name,
            value: e.target.value
        })
    }
    
    //so when Done selected, 4 things need to happen
    //0 check for emptyfields
    //1 append all the form data all the fields
    //2 generate and send quote
    //3 send automated email
    const handleSubmit = async () => {
        setLoadingSubmit(true)
        try {
        let orderData = {
            ...formData
        }
        
        

        //let distanceResult = null
        
        if (formData.service_type === 'courier') {

            const distanceResult = await getDistance()

            console.log("FORM DATA:", formData)
            console.log("WEIGHT:", formData.weight)

        if(!distanceResult) {
            return
        }
        
        orderData = {
            ...orderData,
            pickupAddress,
            dropOffAddress,
            distanceKm: distanceResult.distance,
            durationSeconds: distanceResult.duration
        }
    }
        
        //still all services reach this point  
        const response = await fetch('/api/order/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(orderData)
        })

        const json = await response.json()
        console.log("BACKEND RESPONSE:", json)
        
        
        if(!response.ok){

            if(json.emptyFields) {

            dispatch2({
            type: "SET_EMPTY_FIELDS",
            payload: json.emptyFields
            
        })
    }   

        if (json.invalidFields) {
            dispatch2({
                type: "SET_EMPTY_FIELDS",
                payload: json.invalidFields
            })
        }
        setError(json.error)
        return
  
    }
        
    /* send request -> backend validate -> 

            |                       |                     
            error                   success
            |                       |
            emptyFields            order created
            |                       | 
            context                continue*/

        console.log("Great Success", json)
        setError(null)
        navigate('/thankyou')
        
    } catch(error) {
        console.error("Submit error:", error)
        setError("Something went wrong. Please try again.")
    }
    finally {
        setLoadingSubmit(false)
    }
    }

    //this function is for searching Airports instead of 
    //hardcoding a limited number of airports
    const searchAirports = async(value) => {

        setAirportSearch(value)

        if(value.length < 2){
            setAirportResults([])
            return
        }
        setLoadingAirPorts(true)

        try {
            //connecting api
            const response = await fetch(
                `https://api.freeairportdb.com/v1/airports?q=${value}&limit=10`
            )

            const data = await response.json()
            setAirportResults(data.data)
            //console.log("RESULTS STATE:", airportResults)
            console.log("AIRPORT RESPONSE:", data)
        } catch (error) {
            console.log(error)
            setError('Could not find destination Airport, try again')
        }
        finally {
            setLoadingAirPorts(false)
        }
    }

    //same functionality but for sea ports
    const searchSeaports = async(query) => {
         setSeaportSearch(query)

        if(query.length < 2){
            setSeaportResults([])
            return
        }
        setLoadingSeaPorts(true)
        setTimeout(async () => {

        
        try {
            //connecting to api
            const response = await fetch(`http://localhost:8000/api/seaports?query=${encodeURIComponent(query)}`
    
                
            )
            const data = await response.json()
            setSeaportResults(data)
            console.log("Sea Port Response:", data)
        } catch (error) {
            console.log(error)
            setError('Could not find destination Sea Port, try again')
        }
        finally {
            setLoadingSeaPorts(false)
        }
    }, 400)}
    
    
    

       


    const handleBacktBtn = () => {
        navigate('/RoadFormOne')
    }
    return(<>
            <div className="form-page">
                <div className="form-card">
                <button className="back-btn"
                onClick={handleBacktBtn}> Back</button>
                <form>
                    <div className="form-header">
                        <div className="form-progress">
                            <div className="progress-fill"
                            style={{ width: "100%" }}></div>

                        <div className="form-group">
                           <input 
                           type="number"
                           placeholder="Weight"
                           name="weight"
                           value={formData.weight}
                           onChange={handleChange}
                           className={emptyFields.includes('weight') ? 'error': ''}/> 
                            </div>    

                        <div className="form-group">
                           <input 
                           type="number"
                           placeholder="Height"
                           name="height"
                           value={formData.height}
                           onChange={handleChange}
                           className={emptyFields.includes('height') ? 'error': ''}/> 
                            </div> 

                        <div className="form-group">
                           <input 
                           type="number"
                           placeholder="Length"
                           name="length"
                           value={formData.length}
                           onChange={handleChange}
                           className={emptyFields.includes('length') ? 'error': ''}/> 
                            </div> 

                        <div className="form-group">
                           <input 
                           type="number"
                           placeholder="Width"
                           name="width"
                           value={formData.width}
                           onChange={handleChange}
                           className={emptyFields.includes('width') ? 'error': ''}/> 
                            </div>  
                            
                        

                        
                    <h1>Select Service</h1>
                    <div className="form-group">
                    <label htmlFor="service_type"></label>
                    <select 
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    className={emptyFields.includes('service_type') ? 'error': ''}
                    >
                        <option value="">Select Service Type</option>
                        <option value="courier">Courier & Express</option>
                        <option value="road">Road Freight</option>
                        <option value="air">Air Freight</option>
                        <option value="sea">Sea Freight</option>
                    </select>
                </div>

                {formData.service_type === "air" && (
                    <div className="form-group">
                    <label htmlFor="origin_airport">Origin Airport</label>
                    <select 
                    name="origin_airport"
                    value={formData.origin_airport}
                    onChange={handleChange}
                    className={emptyFields.includes('origin_airport') ? 'error': ''}
                    >
                        <option value="">Select Origin Airport</option>
                        <option value="JNB">O.R Tambo International Airport, JNB</option>
                        <option value="CPT">Cape Town International Airport, CPT</option>
                        <option value="DUR">King Shaka International Airport, DUR</option>
                        <option value="PLZ">Chief Dawid Stuurman International Airport, PLZ</option>
                        <option value="BFN">Bram Fischer International Airport, BFN</option>
                        <option value="ELS">King Phalo Airport, ELS</option>
                        <option value="GRJ">George Airport, GRJ</option>
                        <option value="MQP">Kruger Mpumalanga International Airport, MQP</option>
                        <option value="HLA">Lanseria International Airport, HLA</option>
                        <option value="UTN">Upington International Airport, UTN</option>
                        
                    </select>
                </div>
                )}

                {formData.service_type === "air" && (
                    <div className="form-group">
                    <label htmlFor="destination_airport">Destination Airport</label>
                    
                    <input 
                    type="text"
                    placeholder="Search the airport or city..."
                    name="destination_airport"
                    value={airportSearch}
                    onChange={(e) => searchAirports(e.target.value)}
                    className={emptyFields.includes('destination_airport') ? 'error': ''}
                    
                    />
                {loadingAirPorts && (
                    <div className="air-port-loading">
                        <span className="loading-spinner"></span>
                        Searching airports...
                    </div>
                )}
                {/*iata is the standard 3 letter airport code system*/}
                {airportResults.length > 0 && (
                    <div className="airport-results">

                {airportResults.map((airport, index) => (
    <div
        key={airport.iata || `${airport.name}-${airport.city}-${index}`}
        className="airport-result"
        onClick={() => {
            dispatch2({
                type: "UPDATE_FIELD",
                field: "destination_airport",
                value: airport.iata
            })

            setAirportSearch(
                `${airport.name}, ${airport.city} (${airport.iata})`
            )

            setAirportResults([])
        }}
    >
        <strong>
            {airport.name}
        </strong>

        <span>
            {airport.city}, {airport.country}
        </span>

        <span>
            {airport.iata}
        </span>
    </div>
))}

                    </div>
                )} 
                
                        
                    
                </div>

                
                )}
                {formData.service_type === "air" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Declared Value"
                    type="text"
                    name="declared_value"
                    value={formData.declared_value}
                    onChange={handleChange}                  
                    className={emptyFields.includes('declared_value') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                
                {formData.service_type === "air" && (
                    <div className="form-group">
                    <label htmlFor="cargo_type">Cargo Type</label>
                    <select 
                    name="cargo_type"
                    value={formData.cargo_type}
                    onChange={handleChange}                  
                    className={emptyFields.includes('cargo_type') ? 'error': ''}
                    >
                   <option value="">Select Cargo Type</option>
                    <option value="General Cargo">General Cargo</option>
                    <option value="Dangerous Goods">Dangerous Goods</option>
                    <option value="Perishable Goods">Perishable Goods</option>
                    <option value="Medical">Medical Goods</option>
                    <option value="Live Animals">Live Animals</option>
                    <option value="Valuable Cargo">Valuable Cargo</option>
                    <option value="Fragile Cargo">Fragile Cargo</option>
                    <option value="Oversized Cargo">Oversized Cargo</option>
                    <option value="Temperature-Controlled">Temperature Controlled</option>
                    <option value="Documents">Documents</option>
                     </select>
                    </div>
                )} 
                
                {formData.service_type === "air" && (
                    <div className="form-group">
                    
                    <input 
                    type="text"
                    placeholder="Cargo Description"
                    name="cargo_description"
                    value={formData.cargo_description}
                    onChange={handleChange}                  
                    className={emptyFields.includes('cargo_description') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )} 
                 {formData.service_type === "air" && (
                    <div className="form-group">
                    <label>Required delivery date</label>
                    <input 
                    type="date"
                    name="required_delivery_date"
                    value={formData.required_delivery_date}
                    onChange={handleChange}                  
                    className={emptyFields.includes('required_delivery_date') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                

                {formData.service_type === "sea" && (
                    <div className="form-group">
                    <label htmlFor="shipment_type">Shipment Type</label>
                    <select 
                    name="shipment_type"
                    value={formData.shipment_type}
                    onChange={handleChange}
                    className={emptyFields.includes('shipment_type') ? 'error': ''}
                    >
                        <option value="">Select Shipment Type</option>
                        <option value="FCL">Full Container Load, FCL</option>
                        <option value="LCL">Less than Container Load, LCL</option>
                          
                    </select>
                </div>
                )}

                {/* if not fcl, then cant choose container type*/}
                {formData.service_type === "sea" && 
                    formData.shipment_type === "FCL" && (
                    <div className="form-group">
                    <label htmlFor="container_type">Container Type</label>
                    <select 
                    name="container_type"
                    value={formData.container_type}
                    onChange={handleChange}
                    className={emptyFields.includes('container_type') ? 'error': ''}
                    >
                        <option value="">Select Container Type</option>
                        <option value="20ft">20ft Standard</option>
                        <option value="40ft">40ft Standard</option>
                        <option value="40ft_hc">40ft High Cube</option>
                        <option value="20ft_reefer">20ft Reefer</option>
                        <option value="40ft_reefer">40ft Reefer</option>
                        <option value="40ft_open_top">40ft Open Top</option>
                          
                    </select>
                </div>
                )}

                {formData.shipment_type === "FCL" && (
                    <div className="form-group">
                    <label htmlFor="number_of_containers">No. of Containers</label>
                    <select 
                    name="number_of_containers"
                    value={formData.number_of_containers}
                    onChange={handleChange}
                    className={emptyFields.includes('number_of_containers') ? 'error': ''}
                    >
                        <option value="">Select Number of Containers</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        
                          
                    </select>
                </div>
                )}

                {formData.service_type === "sea" && (
                    <div className="form-group">
                    <label htmlFor="port_of_origin">Port of Origin</label>
                    <select 
                    name="port_of_origin"
                    value={formData.port_of_origin}
                    onChange={handleChange}
                    className={emptyFields.includes('port_of_origin') ? 'error': ''}
                    >
                        <option value="">Select Port of Origin</option>
                        <option value="durban">Port of Durban</option>
                        <option value="richards_bay">Port of Richards Bay</option>
                        <option value="cape_town">Port of Cape Town</option>
                        <option value="saldanha_bay">Port of Saldanha Bay</option>
                        <option value="ngqura">Port of Ngqura (Coega)</option>
                        <option value="gqeberha">Port of Gqeberha (Port of Elizabeth)</option>
                        <option value="east_london">Port of East London</option>
                        <option value="mossel_bay">Port of Mossel Bay</option>
                        
                        
                    </select>
                </div>
                )}

                {formData.service_type === "sea" && (
                    <div className="form-group">
                    <label htmlFor="port_of_destination">Destination Sea Port</label>
                    
                    <input 
                    type="text"
                    placeholder="Search the sea port or city..."
                    name="port_of_destination"
                    value={seaportSearch}
                    onChange={(e) => searchSeaports(e.target.value)}
                    className={emptyFields.includes('port_of_destination') ? 'error': ''}
                    
                    />

                {loadingSeaPorts && (
                    <div className="sea-port-loading">
                        <span className="loading-spinner"></span>
                        Searching seaports...
                    </div>
                )}    
                {/*iata is the standard 3 letter airport code system*/}
                {seaportResults?.length > 0 && (
                    <div className="sea-port-results">

                        {seaportResults.map((seaport) => (
                            <div
                            key={seaport.id}
                            className="sea-port-result"
                            onClick={() => {
                                dispatch2({
                                    type: "UPDATE_FIELD",
                                    field: "port_of_destination",
                                    value: seaport.un_locode
                                })

                                setSeaportSearch(
                                    `${seaport.name}, (${seaport.un_locode})`
                                )

                                setSeaportResults([])

                            }}>
                                <strong>
                            {seaport.name}
                            </strong>

                            <span>
                             {seaport.country}
                            </span>

                            <span>
                            {seaport.un_locode}
                            </span> 

                            </div>
                        ))}

                    </div>
                )} 
                
                        
                 
                </div>
                
                
                )}

                {formData.service_type === "sea" && (
                    <div className="form-group">
                    <label htmlFor="cargo_type">Cargo Type</label>
                    <select 
                    name="cargo_type"
                    value={formData.cargo_type}
                    onChange={handleChange}                  
                    className={emptyFields.includes('cargo_type') ? 'error': ''}
                    >
                    <option value="">Select Cargo Type</option>
                    <option value="General Cargo">General Cargo</option>
                    <option value="Dangerous Goods">Dangerous Goods</option>
                    <option value="Perishable Goods">Perishable Goods</option>
                    <option value="Medical">Medical Goods</option>
                    <option value="Live Animals">Live Animals</option>
                    <option value="Valuable Cargo">Valuable Cargo</option>
                    <option value="Fragile Cargo">Fragile Cargo</option>
                    <option value="Oversized Cargo">Oversized Cargo</option>
                    <option value="Temperature-Controlled">Temperature Controlled</option>
                    <option value="Documents">Documents</option>
                     </select>
                    </div>
                )}   

                {formData.service_type === "sea" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Declared Value"
                    type="text"
                    name="declared_value"
                    value={formData.declared_value}
                    onChange={handleChange}                  
                    className={emptyFields.includes('declared_value') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "sea" && (
                    <div className="form-group">
                    
                    <input 
                    type="text"
                    placeholder="Cargo Description"
                    name="cargo_description"
                    value={formData.cargo_description}
                    onChange={handleChange}                  
                    className={emptyFields.includes('cargo_description') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                {formData.service_type === "sea" && (
                    <div className="form-group">
                    <label>Required delivery date</label>
                    <input 
                    type="date"
                    name="required_delivery_date"
                    value={formData.required_delivery_date}
                    onChange={handleChange}                  
                    className={emptyFields.includes('required_delivery_date') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                
                {/*Courier*/}
                
                
                
                        {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Package Contents"
                    type="text"
                    name="package_contents"
                    value={formData.package_contents}
                    onChange={handleChange}                  
                    className={emptyFields.includes('package_contents') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Parcel Value"
                    type="text"
                    name="parcel_value"
                    value={formData.parcel_value}
                    onChange={handleChange}                  
                    className={emptyFields.includes('parcel_value') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Package Name"
                    type="text"
                    name="package_name"
                    value={formData.package_name}
                    onChange={handleChange}                  
                    className={emptyFields.includes('package_name') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "courier" && (
                    <div className="form-group">
                
                    <select 
                    name="package_type"
                    value={formData.package_type}
                    onChange={handleChange}                  
                    className={emptyFields.includes('package_type') ? 'error': ''}
                    >
                            <option value="">Select Package Type</option>
                            <option value="Box">Box</option>
                            <option value="Crate">Crate</option>
                            <option value="Pallet">Pallet</option>
                            <option value="Bag">Bag</option>
                            <option value="Container">Container</option>
                            <option value="Envelope">Envelope</option>
                     </select>
                    </div>
                )} 


                        </div>
                
                
                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <select 
                    name="delivery_speed"
                    value={formData.delivery_speed}
                    onChange={handleChange}                  
                    className={emptyFields.includes('delivery_speed') ? 'error': ''}
                    >
                            <option value="">Select Service Level</option>
                            <option value="same_day">Same Day</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="normal">Normal</option>
                     </select>
                    </div>
                )}   
                

                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Street Address"
                    type="text"
                    name="street_address"
                    value={formData.street_address}
                    onChange={handleChange}                  
                    className={emptyFields.includes('street_address') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Postal Code"
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}                  
                    className={emptyFields.includes('postal_code') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="City"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}                  
                    className={emptyFields.includes('city') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Province"
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}                  
                    className={emptyFields.includes('province') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                

                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    type="text"
                    placeholder="Recipient Street Address"
                    name="recipient_street_address"
                    value={formData.recipient_street_address}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_street_address') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Recipient City"
                    name="recipient_city"
                    value={formData.recipient_city}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_city') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                
                {formData.service_type === "courier" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Recipient Province"
                    name="recipient_province"
                    value={formData.recipient_province}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_province') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                {formData.service_type === "courier" && (
                    <div className="form-group">
                    <label>Required delivery date</label>
                    <input 
                    type="date"
                    name="required_delivery_date"
                    value={formData.required_delivery_date}
                    onChange={handleChange}                  
                    className={emptyFields.includes('required_delivery_date') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                
                {/*Road Freight*/}
                {formData.service_type === "road" && (
                    <div className="form-group">
                    <label htmlFor="load_type">Load Type</label>
                    <select 
                    name="load_type"
                    value={formData.load_type}
                    onChange={handleChange}
                    className={emptyFields.includes('load_type') ? 'error': ''}
                    >
                        <option value="">Select Load Type</option>
                        <option value="FTL">Full Truck Load, FTL</option>
                        <option value="LTL">Less than Truck Load, LTL</option>
                          
                    </select>
                </div>
                )}

                
                
                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Declared Value"
                    type="text"
                    name="declared_value"
                    value={formData.declared_value}
                    onChange={handleChange}                  
                    className={emptyFields.includes('declared_value') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                {formData.service_type === "road" && (
                    <div className="form-group">
                    <label>Required delivery date</label>
                    <input 
                    type="date"
                    name="required_delivery_date"
                    value={formData.required_delivery_date}
                    onChange={handleChange}                  
                    className={emptyFields.includes('required_delivery_date') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "road" && (
                    <div className="form-group">
                    <label htmlFor="cargo_type">Cargo Type</label>
                    <select 
                    name="cargo_type"
                    value={formData.cargo_type}
                    onChange={handleChange}                  
                    className={emptyFields.includes('cargo_type') ? 'error': ''}
                    >
                    <option value="">Select Cargo Type</option>
                    <option value="General Cargo">General Cargo</option>
                    <option value="Dangerous Goods">Dangerous Goods</option>
                    <option value="Perishable Goods">Perishable Goods</option>
                    <option value="Medical">Medical Goods</option>
                    <option value="Live Animals">Live Animals</option>
                    <option value="Valuable Cargo">Valuable Cargo</option>
                    <option value="Fragile Cargo">Fragile Cargo</option>
                    <option value="Oversized Cargo">Oversized Cargo</option>
                    <option value="Temperature-Controlled">Temperature Controlled</option>
                    <option value="Documents">Documents</option>
                     </select>
                    </div>
                )}

                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    type="text"
                    placeholder="Cargo Description"
                    name="cargo_description"
                    value={formData.cargo_description}
                    onChange={handleChange}                  
                    className={emptyFields.includes('cargo_description') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )} 

                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Pick up Address"
                    type="text"
                    name="street_address"
                    value={formData.street_address}
                    onChange={handleChange}                  
                    className={emptyFields.includes('street_address') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Postal Code"
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}                  
                    className={emptyFields.includes('postal_code') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Pick up City"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}                  
                    className={emptyFields.includes('city') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Pick up Province"
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}                  
                    className={emptyFields.includes('province') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                

                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    type="text"
                    placeholder="Recipient Street Address"
                    name="recipient_street_address"
                    value={formData.recipient_street_address}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_street_address') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}

                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Recipient City"
                    name="recipient_city"
                    value={formData.recipient_city}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_city') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                
                {formData.service_type === "road" && (
                    <div className="form-group">
                    
                    <input 
                    placeholder="Recipient Province"
                    name="recipient_province"
                    value={formData.recipient_province}
                    onChange={handleChange}
                    className={emptyFields.includes('recipient_province') ? 'error': ''}
                    
                    />
                   
                     
                    </div>
                )}
                <div className="form-group">
                           <textarea 
                           placeholder="Additional Information"
                           name="additional_information"
                           value={formData.additional_information}
                           onChange={handleChange}
                           className={emptyFields.includes('additional_information') ? 'error': ''}/> 
                            </div> 
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
                
            <button className="form-btn"
                onClick={handleSubmit}
                disabled={loadingSubmit}>
                    Done   
            </button>
            {loadingSubmit && (
                    <div className="loading-overlay">
                    <div className="loading-modal">

                    <span className="submit-spinner"></span>

                 <h2>Processing your request</h2>

                    <p>
                    Please wait while we submit your quotation.
                </p>

        </div>
    </div>
)}
                </div>
            </div>
            </>)
}

export default RoadFormTwo
/*<Quotation
                formData = {formData}
                >
                </Quotation>*/