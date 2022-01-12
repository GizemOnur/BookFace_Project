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
    const [emailColor, setEmailColor] = useState ('primary');
    const [passwordColor, setPasswordColor] = useState ('primary');
    const [login] = useMutation(LOGIN_MUT);
    
    const history = useHistory();

console.log('email:',email)

console.log('password:',password)  

console.log('emailError:',emailError)

console.log('passwordError:',passwordError)

console.log('emailColor:',emailColor)

console.log('passwordColor:',passwordColor)
  const handleSubmit = async (event)=> {   
    event.preventDefault();
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


      //LOGIN SUCCESS
      console.log(data.login.user._id);
      history.push("/home")
      history.go(+1)
    
    }
  }

  const handleEmailChange=(e)=>{
    setEmail(e)
    if(e==="" || !e.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      setEmailError(true)
    }
    else{
      setEmailError(false)
      
      setEmailColor('success')
    }
  }
  const handlePasswordChange=(e)=>{
    setPassword(e)
    if(e==="" || !e.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
      setPasswordError(true)
    }
    else{
      setPasswordError(false)
      
      setPasswordColor('success')
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
                handleEmailChange(e.target.value)
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
              color={emailColor}
              helperText= "Respect the email format."
            />
            <TextField
              onChange={(e) => handlePasswordChange(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              color={passwordColor}
              autoComplete="current-password"
              error={passwordError}
              helperText= "Password must be at least 8,contain at leat one digit, one uppercase and one lowercase character"
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

