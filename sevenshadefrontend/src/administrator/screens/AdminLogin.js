import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData } from '../../services/FetchDjangoApiService';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; //use to go from one page to another page

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sevenshades.com/">
        sevenshades.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
 
export default function AdminLogin() {
  const[emailid,setEmailId]=useState('')
  const[password,setPassword]=useState('')
  var navigate=useNavigate() 
  const handleSubmit = async() => {
    var body={emailid,password}
    var result=await postData('check_admin_login', body)
    if(result.status)
      {
        //alert(JSON.stringify(result.data))
        const {id, emailid, mobileno, picture, adminname}=result.data[0]
        localStorage.setItem('ADMIN', JSON.stringify({id, emailid, mobileno, picture, adminname})) //by this we set data to 'ADMIN'
        //'ADMIN' is a key & other is value
        //meaning of above two executables lines->{id, emailid, mobileno, picture, adminname}={"id":id, "emailid":emailid, "mobileno":mobileno, "picture":picture, "adminname":adminname} if we specify 
        // value auto treated as key if we specify directly values
        
        //or////////////////////////
        //const {id, emailid, mobileno, picture, adminname}=result.data[0]
        //var body= {"id":id, "emailid":emailid, "mobileno":mobileno, "picture":picture, "adminname":adminname}
        //localStorage.setItem('ADMIN', JSON.stringify(body))
        ///////////////////////////
        navigate('/admindashboard')
      }
        
    else
        alert('Invalid Admin Id Password')
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setEmailId(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button> 
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}