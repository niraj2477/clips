import { FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import React,{useState} from 'react'
import { useCookies } from "react-cookie";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { userUpdate } from "../../apis/User";
const useStyle = makeStyles(theme =>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin:theme.spacing(1)
        },
    button: {
            margin: theme.spacing(2),
        
            paddingRight: theme.spacing(5),
          },
    }
}))

export default function Details(props){
    
    const classes=useStyle();
    const [cookie] = useCookies(["user"]);
    const {setOpenPopup} =props;
    const initialFValues={
        // googleId:0,
        // id:cookie.id,
        fullName:cookie.name.replace('%20', ' '),
        email:cookie.email,
        dob:new Date(),
        // profilePic:'',
        gender:'male'
    }

    const [values,setValues]=useState(initialFValues);
    const handleInputChange= e=>{
        const {name,value}= e.target
        setValues({
            ...values,
            [name]:value
        })
       
    }

    const updateUser=() => {
        console.log("clicked");
        userUpdate(JSON.stringify(values))
        .then((response) => {
            console.log(response)
            setOpenPopup(false);
            alert("Successfully Submitted");
            
        })
        .catch((error) => {
            console.log(error);
          });
    }
    return(
        <form className={classes.root}>
            <Grid container >
                <Grid item xs={6}>
                    <TextField 
                        variant="outlined"
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange}
                    />  
                   
                    <TextField 
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />  
                </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup row
                        name="gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        > 
                            
                            <FormControlLabel value='male' control={<Radio /> } label='Male' />
                            <FormControlLabel value='female' control={<Radio /> } label='Female' />
                            <FormControlLabel value='other' control={<Radio /> } label='other' />
                        </RadioGroup>
                    </FormControl>
                    <TextField
    id="date"
    label="Birthday"
    type="date"
    name="dob"
    value={values.dob}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={updateUser}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}