import { FormContext } from "../context/FormContext";
import { useContext } from "react";

export const useFormContext = () => {
    const context = useContext(FormContext)

    if(!context){
        throw Error('useFormContext must be used inside a FormContextProvider')
    }
    return context
}