import { useEffect } from 'react'
import CardDetails from '../Components/cardDetails'
import FreightDetails from '../Components/freightDetails'
import { useOrderContext } from '../hooks/useOrderContext'
import { useFreightContext } from '../hooks/useFreightContext'
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
    
    /*fetching roadFreight*/
    const {roadFreights, dispatch2} = useFreightContext()

    useEffect(() => {
        const fetchFreight = async () => {
            const response = await fetch('/api/freight/')
            const json = await response.json()

            console.log(response.status)
            console.log(json)
            if(response.ok){
            dispatch2({type: 'SET_FREIGHT', payload: json})
            }
        }
        fetchFreight()
    }, [dispatch2])
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
            {roadFreights && roadFreights.map((roadFreight) => {
                <FreightDetails
                key={roadFreight._id}
                roadFreight={roadFreight}>
                </FreightDetails>
            })}
            
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