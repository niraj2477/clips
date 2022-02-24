import { Typography,Button, TextField,Grid } from '@material-ui/core';
import {useState} from 'react';

function Login() {
    const initialFValues={
        email:"",
        password:""
    }

  
       const [values,setValues]=useState(initialFValues);
       const loginAttempt= () => {
        console.log(values)
    }
    const handleInputChange= e=>{
        const {name,value}= e.target
        setValues({
            ...values,
            [name]:value
        })
       
    }
    return ( 
        <div>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            
            >
                <Grid item xs={3}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleInputChange}
                />
                 <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleInputChange}
            />
             <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginAttempt}
            >
              Sign In
            </Button>
                </Grid>      
            </Grid>   
        </div>
     );
}

export default Login;