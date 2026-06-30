import { orderContext } from "../context/orderContext";
import { useContext } from "react";

//hook
export const useOrderContext = () => {
    const context = useContext(orderContext)
    //this hook returns the value of this (orderContext) context
    //which is (state, dispatch)

//to check if were within scope of context
    if(!context) {
        throw Error('useOrderContext must be used inside a OrderContextProvider')
    }
    return context
}