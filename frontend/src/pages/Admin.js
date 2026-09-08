import { useEffect } from 'react'
import CardDetails from '../Components/cardDetails'
import { useOrderContext } from '../hooks/useOrderContext'
import { Link } from 'react-router-dom'
const Admin = () => {
    
    //const [orders, setOrders] = useState(null)
    
    //admin sides functions are to view orders
    const {orders, dispatch} = useOrderContext()
    useEffect(() => {
        
        const fetchOrders = async () => {
            const response = await fetch('/api/order/')
            const json = await response.json()

            console.log(response.status)
            console.log(json)
            if(response.ok){
            dispatch({type: 'SET_ORDER', payload: json})
            }
        }
    
        fetchOrders()
    }, [dispatch])
    


    useEffect(() => {
        const fetchFreight = async () => {
            const response = await fetch('/api/freight/')
            const json = await response.json()

            console.log(response.status)
            console.log(json)
            
        }
        fetchFreight()
    }, [])
    //figuring out where to display
        
       return(
        <>
        <Link to={"/shipment"}>Create Shipment</Link>
        <div className='admin'>
            <div className='orders'>
            <h1>Orders</h1>
            {orders && orders.map((order) => (     
                <CardDetails 
                key={order._id} 
                order={order}
                 ></CardDetails>
                
            ))
            }
            
            
            </div>
             
        </div>
        </>
        
       )
       /*<ShipmentForm
                 key={order._id} 
                order={order}>
                 </ShipmentForm>
                 dont need this as for shipmentForm
                 it already has order(state) so we used that one*/
    
}

export default Admin