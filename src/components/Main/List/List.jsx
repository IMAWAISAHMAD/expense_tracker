import React,{useContext} from 'react'
import { List as MUIList,ListItem,ListItemAvatar,ListItemText,Avatar,ListItemSecondaryAction,IconButton,Slide } from '@material-ui/core';
import {Delete,MoneyOff} from "@material-ui/icons";

import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from "./styles";

const List = () => {
    const classes = useStyles();
    /* const transactions = [
    {id:1,type:"Income",category:"Salary",amount:100,date: "Wed Dec 16"},
    {id:2,type:"Income",category:"Business",amount:50,date: "Wed Dec 15"},
    {id:3,type:"Expense",category:"Pets",amount:20,date: "Wed Dec 17"}
    ]; */
    const {transactions,deleteTransaction} = useContext(ExpenseTrackerContext);
    
    const handleDelete = (id) => {
        deleteTransaction(id)
    }

    return (
        <MUIList dense={false} className={classes.list}> 
            {transactions.map(transaction=>(
                <Slide direction="down" in mountOnEnter mountOnExit key={transaction.id} >
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type==="Income" ? classes.avatarIncome: classes.avatarExpense}>
                                <MoneyOff/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aeria-label="delete" onClick={()=>handleDelete(transaction.id)}>
                                <Delete/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

export default List;