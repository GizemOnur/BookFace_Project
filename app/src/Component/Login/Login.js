import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  useMutation,
  gql
} from "@apollo/client";
import { useHistory }from 'react-router-dom';



const theme = createTheme();


const LOGIN_MUT = gql`
mutation ( $email:String!,  $password:String! ){
  login(email: $email, password: $password ) {
    errors {
      field
      message
    }
    user {
      _id
    }
  }
}
`;




export default function Login() {
  
 
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [emailError, setEmailError] = useState (false);
    const [passwordError, setPasswordError] = useState (false);
    const [help, setHelp] = useState ('');

    const [login] = useMutation(LOGIN_MUT);
    
    const history = useHistory();


  

    const handleSubmit = async (event)=> {
   
        event.preventDefault();
        setEmailError(false);
        setPasswordError(false);


        if(password === '') {
          setPasswordError(true)
      }
      if(email === '') {
          setEmailError(true);
      }
          const {data} = await login({
          variables: { 
            email: email,
            password:password }
     })

     if(data.login.user == null){
     console.log(data.login.errors)
     }
     else{
      console.log(data.login.user._id);
      history.push("/home")
      history.go(+1)
    
    }
   
  }

   
   
  

  return (
    
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    
          <Typography component="h2" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              } }
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              autoFocus
              error={emailError}
              helperText= "Respect the email format."
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
                setHelp("Minimum length of 8 characters, at least one digit, one uppercase and one lowercase character")
                }}
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText= {help}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}

