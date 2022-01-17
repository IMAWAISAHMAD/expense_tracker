import React, {useReducer,createContext} from "react";
import contextReducer from "./contextReducer";

//Set initial state to empty array
const initialState = [];


//Create context and pass initial state
export const ExpenseTrackerContext = createContext(initialState);

//Creating provider
export const Provider = ({children}) => {
    const [transactions,dispatch] = useReducer(contextReducer,initialState);

    //Action Creators

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