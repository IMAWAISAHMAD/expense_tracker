import React,{useState,useContext,useEffect} from 'react'
import { TextField,Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem } from '@material-ui/core';
import {v4 as uuidv4} from "uuid";
import { useSpeechContext } from '@speechly/react-client';
import {ExpenseTrackerContext} from "../../../context/context";
import { incomeCategories,expenseCategories } from '../../../constants/categories';

import formateDate from '../../../utils/formateDate';

import useStyles from "./styles";

//Initial Form Data
const initialFormData = {
    amount:"",
    category:"",
    type:"Income",
    date: formateDate(new Date()),
}
const Form = () => {
    
    const classes = useStyles();
    const [formData,setFormData] = useState(initialFormData);

    const {addTransaction} = useContext(ExpenseTrackerContext);

    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;
    
    const {segment} = useSpeechContext();

    const createTransaction = () => {
        if(Number.isNaN(Number(formData.amount))|| !formData.date.includes("-")) return;

        const transaction = {...formData,amount:Number(formData.amount),id:uuidv4()};
        
        addTransaction(transaction);
        
        setFormData(initialFormData);
    }

    useEffect(()=>{
        if(segment){
            if(segment.intent.intent === "add_expense"){
                setFormData({...formData,type: "Expense"});
            }else if(segment.intent.intent === "add_income"){
                setFormData({...formData,type: "Income"});
            }else if(segment.isFinal && segment.intent.intent === "create_transaction"){
                return createTransaction();
            }else if(segment.isFinal && segment.intent.intent === "cancel_transaction"){
                return setFormData(initialFormData);
            }
            segment.entities.forEach((e)=>{
                console.log(e.value);
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch(e.type){
                    case "amount":
                        setFormData({...formData,amount:e.value})
                    break;
                    case "category":
                        if(incomeCategories.map((iC)=>iC.type).includes(category)){
                            setFormData({...formData,type:"Income",category})         
                        }else if(expenseCategories.map((eC)=>eC.type).includes(category)){
                            setFormData({...formData,type:"Expense",category}) 
                        }
                    break;
                    case "date":
                        setFormData({...formData,date:e.value})
                    break;
                    default:
                    break;
                }
            })

            if(segment.isFinal && formData.amount && formData.category && formData.type && formData.date){
                createTransaction();
            }
        }

        
    },[segment])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                     {segment && segment.words.map((w)=>w.value).join(" ")}
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
                      {selectedCategories.map((c)=>(
                           <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>
                      ))}
                   </Select>
               </FormControl> 
            </Grid>
            <Grid item xs={6}>
                  <TextField type="number" name="amount" value={formData.amount} fullWidth onChange= {(e)=> setFormData({...formData,amount:e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                  <TextField type="date" name="date" value={formData.date} fullWidth onChange= {(e)=> setFormData({...formData,date:formateDate(e.target.value)})} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form;
