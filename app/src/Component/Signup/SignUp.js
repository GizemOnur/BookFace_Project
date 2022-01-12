import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

const REGISTER_MUT =gql`
mutation ($email:String!,$password:String!,$firstname:String!,$lastname:String! ){
  createUser( email: $email, password: $password , firstname: $firstname, lastname: $lastname){
    user{
      _id
    }
    errors{
      field
			message
    }
  }
}
`;
const MUTTEST = gql`
mutation{
  createUser(options: { email: "hfghsdsdsdfddghf", password: "passwor1Ad" }, firstname:"sdqsdqsdqsd", lastname:"sdqsdqsdqsd"){
    user{
      _id
    }
    errors{
      field
			message
    }
  }
}`

export default function SignUp() {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const[lastname, setLastName]=useState('')
  const [emailError, setEmailError] = useState (false);
  const[firstname, setFirstName]=useState('')
  const [passwordError, setPasswordError] = useState (false);
  const [confirmPasswordError, setConfirmPasswordError] = useState (false);
  const [passwordColor, setPasswordColor] = useState ('primary');
  const [emailColor, setEmailColor] = useState ('primary');
  const [confirmPasswordColor, setConfirmPasswordColor] = useState ('primary');
  
  const history = useHistory();

console.log('email:',email)

console.log('password:',password)  

console.log('emailError:',emailError)

console.log('passwordError:',passwordError)

console.log('emailColor:',emailColor)

console.log('passwordColor:',passwordColor)
console.log('Confirm passwordError:',confirmPasswordError)

console.log('Confirm passwordColor:',confirmPasswordColor)

console.log('confirm Password:',confirmPassword)

  const [register, { loading, error, data }] = useMutation(REGISTER_MUT);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
   const {data}= await  register(
     {
       variables:{
        email:email,
        password:password,
       lastname:lastname,
       firstname:firstname
     },
    }
    )
    console.log("createUser",data.createUser.user)
    console.log(data.createUser.errors)
      if (data.createUser.user == null)
      console.log(data.createUser.errors)
      else 
      console.log(data.createUser.user)
      history.push("/home")
      history.go(+1)
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
  const handlePasswordConfirmChange=(e,password)=>{
    setConfirmPassword(e)
    if(e===''){
      setConfirmPasswordError(true)
    }
    else if(e!==password) {
      setConfirmPasswordError(true)
      
    }
    else {
      setConfirmPasswordError(false)
      setConfirmPasswordColor('success')  
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
          Don't have an account? Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  name="firstName"
                  value={firstname}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                onChange={(e) => setLastName(e.target.value)}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastname}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                onChange={(e) => handleEmailChange(e.target.value)}
                  required
                  fullWidth
                  value={email}
                  id="email"
                  label="Email Address"
                  error={emailError}
                  name="email"
                  color={emailColor}
                  autoComplete="email"
                  helperText= "Respect the email format."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  id="password"
                  error={passwordError}
                  color={passwordColor}
                  autoComplete="new-password"
                  helperText= "Password must be at least 8,contain at leat one digit, one uppercase and one lowercase character"
            
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(e) => handlePasswordConfirmChange(e.target.value,password)}
                  name="password_confirm"
                  label="Confirm password"
                  type="password_confirm"
                  value={confirmPassword}
                  id="password_confirm"
                  error={confirmPasswordError}
                  autoComplete="new-password"
                  color={confirmPasswordColor}
                  helperText= "Passwords must be the same "
            
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Subscribe to our newsletter"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}