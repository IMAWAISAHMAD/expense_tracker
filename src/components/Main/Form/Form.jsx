import React,{useState,useContext} from 'react'
import { TextField,Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem } from '@material-ui/core';
import {v4 as uuidv4} from "uuid";

import {ExpenseTrackerContext} from "../../../context/context";

import useStyles from "./styles";

//Initial Form Data
const initialFormData = {
    amount:"",
    category:"",
    type:"Income",
    date: new Date()
}
const Form = () => {
    
    const classes = useStyles();
    const [formData,setFormData] = useState(initialFormData);

    const {addTransaction} = useContext(ExpenseTrackerContext);


    const createTransaction = () => {
        const transaction = {...formData,amount:Number(formData.amount),id:uuidv4()};
        addTransaction(transaction);
        setFormData(initialFormData);
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    ...
                </Typography>
            </Grid>
            <Grid item xs={6}>
               <FormControl fullWidth>
                   <InputLabel>Type</InputLabel>
                   <Select value={formData.type} onChange= {(e)=> setFormData({...formData,type:e.target.value})}>
                       <MenuItem value="Income">Income</MenuItem>
                       <MenuItem value="Expense">Expense</MenuItem>
                   </Select>
               </FormControl> 
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                   <InputLabel>Category</InputLabel>
                   <Select value={formData.category} onChange= {(e)=> setFormData({...formData,category:e.target.value})}>
                       <MenuItem value="Business">Business</MenuItem>
                       <MenuItem value="Salary">Salary</MenuItem>
                   </Select>
               </FormControl> 
            </Grid>
            <Grid item xs={6}>
                  <TextField type="number" name="amount" value={formData.amount} fullWidth onChange= {(e)=> setFormData({...formData,amount:e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                  <TextField type="date" name="date" value={formData.date} fullWidth onChange= {(e)=> setFormData({...formData,date:e.target.value})} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form;
