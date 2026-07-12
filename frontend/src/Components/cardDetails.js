import { useOrderContext } from '../hooks/useOrderContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import OrderModal from './OrderModal'
import { useState } from 'react'

 
const CardDetails = ({ order }) => {
//admin.js is the parent
//it passed order in. order comes from iterating orders
//we do the same at the bottom and pass that prop to orderModal
//over the orders array
    //for modal -> update
    const [showModal, setShowModal] = useState(false) 
    const { dispatch } = useOrderContext()

     

    const handleClick = async () => {
        const response = await fetch('/api/order/' + order._id, {
            method: 'DELETE'
            //first backend will attempt to delete from db

        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'DELETE_ORDER', payload: json})
        }
    }
    //setting back Modal to false,
    //calling it in OrderModal
    const closeModal = () => {
        setShowModal(false)
        //passed the prop into orderModal below
    }

    
   


    return(
        <div className="admin-card-details">
            <h3>{order.company_name}</h3>
                <p><strong>Contact Name: </strong>{order.contact_name}</p>
                <p><strong>Contact Email: </strong>{order.email}</p>
                <p><strong>Phone: </strong>{order.phone}</p>
                <p><strong>Street Address: </strong>{order.street_address}</p>
                <p><strong>City: </strong>{order.city}</p>
                <p><strong>Postal Code: </strong>{order.postal_code}</p>
                <p><strong>Province: </strong>{order.province}</p>
                <p><strong>Recipient Company: </strong>{order.recipient_company}</p>
                <p><strong>Email: </strong>{order.recipient_email}</p>
                <p><strong>Phone: </strong>{order.recipient_phone}</p>
                <p><strong>Street Address: </strong>{order.recipient_street_address}</p>
                <p><strong>City: </strong>{order.recipient_city}</p>
                <p><strong>Province: </strong>{order.recipient_province}</p>

                <p><strong>Weight: </strong>{order.weight}</p>
                <p><strong>Height: </strong>{order.height}</p>
                <p><strong>length: </strong>{order.length}</p>
                <p><strong>Width: </strong>{order.width}</p>

                <p><strong>Package Contents: </strong>{order.package_contents}</p>
                <p><strong>Parcel Value: </strong>{order.parcel_value}</p>
                <p><strong>Package Name: </strong>{order.package_name}</p>
                <p><strong>Shipment Options: </strong>{order.shipment_options}</p>
                <p><strong>Delivery Status: </strong>{order.delivery_status}</p>
                <p><strong>Distance:</strong> {order.distanceKm} km</p>
                <p><strong>Duration:</strong> {order.durationMinutes} min</p>
                <p><strong>Estimated Amount:</strong> R{order.estimatedAmount}</p>
                

                <p>Created {formatDistanceToNow(new Date(order.createdAt), {addSuffix: true})}</p>
                {order.updatedAt && (
                    <p>Updated {formatDistanceToNow(new Date(order.updatedAt), {addSuffix: true})}</p>
                )}
                
                <button onClick={handleClick}>Delete</button>
                <button onClick={() => setShowModal(true)}>Update</button>
        

        {showModal && (
            <OrderModal
                order={order}
                closeModal={closeModal}>
            </OrderModal>
        )}
        
        </div>
    )
    //above passing props to orderModal
}
/*check buttons*/

export default CardDetails

/*
<p><strong>Distance: </strong>{distancKm.toFixed(1)} km</p>
                <p><strong>Duration: </strong>{durationMinutes} min</p>
                <p><strong>Estimated Amount: </strong>R{estimatedAmount}</p>*/
