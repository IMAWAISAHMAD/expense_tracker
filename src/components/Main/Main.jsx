import React from 'react';
import {Card,CardHeader,CardContent,Typography,Grid,Divider} from "@material-ui/core";

import Form from "./Form/Form";
import List from "./List/List";

import useStyles from "./styles";

const Main = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Powered By Speechly"/>
            <CardContent>
                <Typography align="center" variant="h5">Total Balance $150</Typography>
                <Typography variant="subtitle1" style={{lineHeight:"1.5em",marginTop:"20px"}}>
                    {/* InfoCard */}
                    Try saying: Add income for $100 in category salary for monday...
                </Typography>
                <Divider/>
                <Form/>
                <CardContent className={classes.cartContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List/>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardContent>
        </Card>
    )
}

export default Main;
