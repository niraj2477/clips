import {Card,Box,CardContent,CardHeader,Button} from '@material-ui/core'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { getCategory } from "../../apis/Category";
import React, { useEffect,useState } from "react";
import Popup from './Popup';
import { addCategory } from '../../apis/Category';
import { Grid, TextField } from '@material-ui/core';
const style = makeStyles({
  titleItemRight: {
    color: "white",
    backgroundColor: "blue",
    top: "50%",
    height: 30,
    float: "right",
    position: "relative",
    transform: "translateY(-50%)"
  }
});
 
  
function Index() {
 
  const classes = style();
   let rows = [];
   const [openPopup,setOpenPopup] = useState(false)
   const initialFValues={
    name:""
}
   const [values,setValues]=useState(initialFValues);
   let changeOpenPopup= () =>{
     setOpenPopup(true)
   }

   const addCategoryFun= ()=>{
   
     addCategory(values).then((response) => {
       console.log(response)
       setOpenPopup(false)
     });
   }

   const handleInputChange= e=>{
    const {name,value}= e.target
    setValues({
        ...values,
        [name]:value
    })
   
}
  useEffect(() => {
   
    getCategory().then((response) => {
      console.log(response.data[0].name);
      rows=response.data;
      console.log(rows[0]);
    });
  }, [""]);

 

    return ( 
        <div>
           <Popup
        openPopup ={openPopup}
        setOpenPopup={setOpenPopup}
      >
      <form className={classes.root}>
        <Grid container >
        <Grid item xs={12}>
                    <TextField 
                        variant="outlined"
                        label="Category Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                    />  
                </Grid>

                <Grid item xs={12}>
                <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        onClick={addCategoryFun}
                       
                    >
                        Upload
                    </Button>
                </Grid>
                
        </Grid>
      </form>
      </Popup>
          <Card sx={{ minWidth: 275 }}>
            <CardHeader  title="Categories" />
            <Box className={classes.titleBar}>
              <Button variant="text" className={classes.titleItemRight} onClick={changeOpenPopup}>
                Add Category
              </Button>
            </Box>
            
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      
                      <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                      
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer> 
            </CardContent>
          </Card>
        </div>
     );
}

export default Index;