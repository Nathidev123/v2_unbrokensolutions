import { freightContext } from "../context/freightContext";
import { useContext } from "react";

export const useFreightContext = () => {
    const context = useContext(freightContext)
    //returning values of orderContext
    //(state and dispatch)

    //checking if its happening within the scope
    //of context
    if(!context){
        throw Error('useFreightContext must be used inside a FrreightContextProvider')
    }
    return context
}