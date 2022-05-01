import {
    Grid,
    makeStyles,
    TextField,
  } from "@material-ui/core";
  import React, { useState } from "react";
  import { useCookies } from "react-cookie";
  import Button from "@material-ui/core/Button";
  import { addPlaylist } from "../../apis/UserPlaylist";
  const useStyle = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: "80%",
        margin: theme.spacing(1),
      },
      button: {
        margin: theme.spacing(2),
  
        paddingRight: theme.spacing(5),
      },
    },
  }));
  
  export default function CreatePlaylist(props) {
    const classes = useStyle();
    const [cookie] = useCookies(["user"]);
    const { setOpenPopup } = props;
    const initialFValues = {
      id:cookie.id,
      name:""
    };
  
    const [values, setValues] = useState(initialFValues);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
  
    const AddPlaylist = () => {
        console.log(values);
        addPlaylist(values.id,values.name)
        .then(result => {
            console.log("Successfully Created")
            setOpenPopup(false)
        })
        .catch(err =>{
            console.log("Failed")
            setOpenPopup(false)
        })
      };
    return (
      <form className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
  
          </Grid>
          <Grid item xs={6}>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={AddPlaylist}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
  