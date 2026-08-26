import { createContext, useReducer } from 'react'
export const FormContext = createContext()

const initialState = {
    formData: {
       company_name: '',
        contact_name: '',
        email: '', phone: '', 
        street_address: '',
        city: '', 
        postal_code: '',
        province: '', 
        recipient_company: '',
        recipient_name: '',
        recipient_email: '',
        recipient_phone: '',
        recipient_street_address: '',
        recipient_city: '', 
        recipient_province: '',
        weight: '', 
        height: '', 
        length: '', 
        width: '', 
        package_contents: '', 
        parcel_value: '',
        package_name: '', 
        package_type: '',
        delivery_speed: '',
        origin_airport: '',
        destination_airport: '',
        cargo_type: '',
        cargo_description: '',
        shipment_type: '',
        container_type: '',
        number_of_containers: '',
        port_of_origin: '',
        port_of_destination: '',
        load_type: '',
    },
    emptyFields: []
     
}
// splitting the form to 2/3 pages
// so handling the flow of data and monitoring changes
export const formReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value
                }
            }
            case "RESET_FORM":
                return initialState
            
            default: 
                return state    
    }
}

export const FormContextProvider = ({ children }) => {

    const [state, dispatch2] = useReducer(formReducer, initialState)

    return (
        <FormContext.Provider value={{  ...state, dispatch2}}>
            {children}
        </FormContext.Provider>
    )
}