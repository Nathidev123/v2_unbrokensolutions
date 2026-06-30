
const OrderDetails = ({ order }) => {

    return(
        <>
        <div className="wrap">
        <div className="all-details">
        <h3>{order.company_name}</h3>
                <p><strong>Contact Name: </strong>{order.contact_name}</p>
                <p><strong>Contact Email: </strong>{order.email}</p>
                <p><strong>Phone: </strong>{order.phone}</p>
                <p><strong>Street Address: </strong>{order.street_address}</p>
                <p><strong>City: </strong>{order.city}</p>
                <p><strong>Postal Code: </strong>{order.postal_code}</p>
                <p><strong>Province: </strong>{order.province}</p>
                <p><strong>Created At: </strong>{order.createdAt}</p>
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
        
                <button>Delete</button>
                <button>Update</button>
        </div>
        </div>        
        </>
    )
}

export default OrderDetails

