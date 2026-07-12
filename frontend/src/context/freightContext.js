import { createContext, useReducer } from "react";

export const freightContext = createContext()

export const freightReducer = (state, action) => {
    switch(action.type){
        case 'SET_FREIGHT':
            return{
                roadFreights: action.payload
            }
        case 'CREATE_FREIGHT':
            return{
                roadFreights: [action.payload, ...state.roadFreights]
                //returning new freight property attached
                //to the other previous
            }    
        case 'DELETE_FREIGHT': 
            return{
                roadFreights: state.roadFreights.filter((currentFreight) => 
                currentFreight._id !== action.payload)
            }    
        case 'PATCH_FREIGHT':
            return{
                roadFreights: state.orders.map(roadFreight => {
                    return roadFreight._id === action.payload._id ?
                    action.payload: roadFreight
                })
            }
            default: return state
    }
}

export const RoadFreightContextProvider = ({ children }) => {
    const [state, dispatch2] = useReducer(freightReducer, {
        roadFreights: []
        //so state becomes our roadFreights
    })
    return(
        <freightContext.Provider value={{...state, dispatch2}}>
            {children}
        </freightContext.Provider>
    )
}