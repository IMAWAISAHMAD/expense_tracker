import {makeStyles} from "@material-ui/core";

export default makeStyles ((theme)=>({
    root:{
        widht: "100%",
        "& > * + *":{
            marginTop: theme.spacing(2)
        }
    }
}));
