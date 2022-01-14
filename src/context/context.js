import React, {useReducer,createContext} from "react";
import contextReducer from "./contextReducer";
const initialState = [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
    const [transactions,dispatch] = useReducer(contextReducer,initialState);


    //Add Transaction Action Creator
    const addTransaction = (transaction) => dispatch({type:"ADD_TRANSACTION",payload:transaction});
    
    //Delete Transaction Action Creator
    const deleteTransaction = (id) => dispatch({type:"DELETE_TRANSACTION",payload:id});
    

    return(
    <ExpenseTrackerContext.Provider value={{
        addTransaction,
        deleteTransaction,
        transactions,
    }}>
        {children}
    </ExpenseTrackerContext.Provider>
    )
    
}