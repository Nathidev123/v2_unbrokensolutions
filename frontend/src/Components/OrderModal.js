import { useState } from "react";
import { useOrderContext } from "../hooks/useOrderContext";

const OrderModal = ({ order, closeModal }) => {
  const { dispatch } = useOrderContext();

  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);

  const [editOrder, setEditOrder] = useState({
    ...order,
    //one object, one State
    //holding a copy of the order
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    //patch request

    const response = await fetch("/api/order/" + order._id, {
      method: "PATCH",
      body: JSON.stringify(editOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    console.log(response.status);

    if (!response.ok) {
      setError(json.error); //from controller
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      //dispatch
      dispatch({ type: "PATCH_ORDER", payload: json });
      closeModal();
    }
  };

  /*setState({
    ...state,
    property: newValue
})  //also have this state to avoid creating states
  //for all inputs

    copy everything, change one thing
    
    when user edits, a certain input,
    react does: copy the whole folder, then replace the one document
    inside it
    //remember the order above is a copy of the state
    // Remember React treats props as read only*/

  /* before we created one handler for onChange:
    <input value={editOrder.email}
                onChange={(e) => setEditOrder({
                    ...editOrder, email: e.target.value
                })}/>*/

  const handleChange = (e) => {
    setEditOrder({
      ...editOrder,
      [e.target.name]: e.target.value,
    });
    //one handle change for all inputs
    //makes code cleaner
  };
  return (
    <>
      <form onSubmit={handleUpdate}>
        <div className="wrap">
          <div className="all-details">
            <label>Company Name</label>
            <input
              value={editOrder.company_name}
              onChange={handleChange}
              name="company_name"
            />

            <label>Contact Name: </label>
            <input
              value={editOrder.contact_name}
              onChange={handleChange}
              name="contact_name"
              className={emptyFields.includes("contact_name") ? "error" : ""}
            />

            <label>Email: </label>
            <input
              value={editOrder.email}
              onChange={handleChange}
              name="email"
              className={emptyFields.includes("email") ? "error" : ""}
            />

            <label>Phone: </label>
            <input
              name="phone"
              value={editOrder.phone}
              onChange={handleChange}
              className={emptyFields.includes("phone") ? "error" : ""}
            />
            <label>Steet Address</label>
            <input
              value={editOrder.street_address}
              onChange={handleChange}
              name="street_address"
              className={emptyFields.includes("street_address") ? "error" : ""}
            />

            <label>City</label>
            <input
              value={editOrder.city}
              onChange={handleChange}
              name="city"
              className={emptyFields.includes("city") ? "error" : ""}
            />

            <label>Postal Code</label>
            <input
              value={editOrder.postal_code}
              onChange={handleChange}
              name="postal_code"
              className={emptyFields.includes("postal_code") ? "error" : ""}
            />

            <label>Province</label>
            <input
              value={editOrder.province}
              onChange={handleChange}
              name="province"
              className={emptyFields.includes("province") ? "error" : ""}
            />

            <label>Recipient Company</label>
            <input
              value={editOrder.recipient_company}
              onChange={handleChange}
              name="recipient_company"
              className={
                emptyFields.includes("recipient_company") ? "error" : ""
              }
            />

            <label>Name</label>
            <input
              value={editOrder.recipient_name}
              onChange={handleChange}
              name="recipient_name"
              className={emptyFields.includes("recipient_name") ? "error" : ""}
            />

            <label>Recipient Email</label>
            <input
              value={editOrder.recipient_email}
              onChange={handleChange}
              name="recipient_email"
              className={emptyFields.includes("recipient_email") ? "error" : ""}
            />

            <label>Recipient Phone</label>
            <input
              value={editOrder.recipient_phone}
              onChange={handleChange}
              name="recipient_phone"
              className={emptyFields.includes("recipient_phone") ? "error" : ""}
            />

            <label>Recipient Street Address</label>
            <input
              value={editOrder.recipient_street_address}
              onChange={handleChange}
              name="recipient_street_address"
              className={
                emptyFields.includes("recipient_street_address") ? "error" : ""
              }
            />

            <label>Recipient City</label>
            <input
              value={editOrder.recipient_city}
              onChange={handleChange}
              name="recipient_city"
              className={emptyFields.includes("recipient_city") ? "error" : ""}
            />

            <label>Recipient Province</label>
            <input
              value={editOrder.recipient_province}
              onChange={handleChange}
              name="recipient_province"
              className={
                emptyFields.includes("recipient_province") ? "error" : ""
              }
            />

            <label>Weight</label>
            <input
              value={editOrder.weight}
              onChange={handleChange}
              name="weight"
              className={emptyFields.includes("weight") ? "error" : ""}
            />

            <label>Height</label>
            <input
              value={editOrder.height}
              onChange={handleChange}
              name="height"
              className={emptyFields.includes("height") ? "error" : ""}
            />

            <label>length</label>
            <input
              value={editOrder.length}
              onChange={handleChange}
              name="length"
              className={emptyFields.includes("length") ? "error" : ""}
            />

            <label>Width</label>
            <input
              value={editOrder.width}
              onChange={handleChange}
              name="width"
              className={emptyFields.includes("width") ? "error" : ""}
            />

            <label>Package Contents</label>
            <input
              value={editOrder.package_contents}
              onChange={handleChange}
              name="package_contents"
              className={
                emptyFields.includes("package_contents") ? "error" : ""
              }
            />

            <label>Parcel Value</label>
            <input
              value={editOrder.parcel_value}
              onChange={handleChange}
              name="parcel_value"
              className={emptyFields.includes("parcel_value") ? "error" : ""}
            />

            <label>Package Name: </label>
            <input
              value={editOrder.package_name}
              onChange={handleChange}
              name="package_name"
              className={emptyFields.includes("package_name") ? "error" : ""}
            />

            <label>Distance: </label>
            <input
              value={editOrder.distanceKm}
              onChange={handleChange}
              name="distanceKm"
              className={emptyFields.includes("distanceKm") ? "error" : ""}
            />

            <label>Duration: </label>
            <input
              value={editOrder.durationMinutes}
              onChange={handleChange}
              name="durationMinutes"
              className={emptyFields.includes("durationMinutes") ? "error" : ""}
            />

            <label>Estimated Amount: </label>
            <input
              value={editOrder.estimatedAmount}
              onChange={handleChange}
              name="estimatedAmount"
              className={emptyFields.includes("stimatedAmount") ? "error" : ""}
            />

            <label>Shipment Options</label>
            <input
              value={editOrder.shipment_options}
              onChange={handleChange}
              name="shipment_options"
              className={
                emptyFields.includes("shipment_options") ? "error" : ""
              }
            />

            <label>Delivery Status:</label>
            <select
              onChange={handleChange}
              value={editOrder.delivery_status}
              name="delivery_status"
              className={emptyFields.includes("delivery_status") ? "error" : ""}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

            {error && <div className="error">{error}</div>}
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default OrderModal;
/*<label>Delivery Status:</label>
            <select onChange={handleChange}
                value={order.delivery_status}
                name="delivery_status"
                className={emptyFields.includes('delivery_status') ? 'error' : ''}/>*/
