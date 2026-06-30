import { createContext, useReducer } from 'react'

export const orderContext = createContext()

export const orderReducer = (state, action) => {
    switch(action.type){
        case 'SET_ORDER':
            return{
                orders: action.payload
            }
        case 'CREATE_ORDER':
            return{
                orders: [action.payload, ...state.orders]
                //returning the new orders property attached to the rest of
                //the orders
            } 
        case 'DELETE_ORDER':
            return{
                orders: state.orders.filter((f) => f._id !== action.payload)
            }    
            default: return state
        }
}

//creating context provider component
//creating global state, accessible from any component
//making 'orders' global
export const OrderContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(orderReducer, {
        orders: null
    })

    //wrapped app in index.js
    return(
        <orderContext.Provider value={{...state, dispatch}}>
            {children}
        </orderContext.Provider>
    )
}