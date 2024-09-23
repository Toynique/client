import React, {useEffect, useState} from "react"; 
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField"; 
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom"; 

import { useNavigate } from "react-router-dom"; 
import axios from "axios";
// import Swal from 'sweetalert2'; 
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { Url } from "../../url/url" ;

import sideBanner from '/assets/img/sidebanner.jpg'  
import logoImg from '/assets/img/logo-dark.png'

const defaultTheme = createTheme(); 

const SignUp = ()=>{  
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataObj ={
      email: data.get("email"),
      phone: data.get("phone"),
      name: data.get("name"),
      password: data.get("password"),
      isVerify : 0
    }; 
    const {name, email, phone, password} = dataObj 
    try { 
      if(name && email && phone && password){
      await axios.post(`${Url}/user/add`, dataObj).then((e)=>{
          console.log("before success");
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Signup Success',
              showConfirmButton: false,
              timer: 1500
            }) 
            setErrMsg('')
            console.log("signup response", e)
            const id = e.data._id
            navigate(`/user-verification-check/${id}`) 
          })
        } 
      else{
          Swal.fire('All fields are required')
          setErrMsg('All fields are required')
        }
      }
      catch (error) { 
          if(error.response){
            (error.response.status === 409) ? 
            setErrMsg(`${error.response.statusText}`) : null 
          }
          else{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'something went wrong',
              showConfirmButton: false,
              timer: 1500
            }) 
          }
      }
  }; 
 
  const auth = localStorage.getItem('usertoken')
  useEffect(()=>{
      if(auth){
          navigate('/')
      }
  })
  return (
    <>
    {!auth ?
      <section>
        <div className="row min-vh-100">
          <div className="col-md-6 col-12 sm-none">
            <div className="h-100">
              <img
                src={ sideBanner }
                className="overflow-hidden h-100 img-fluid"
                alt="image"
              />
            </div>
          </div>
          <div className="col-md-6 col-12  bg-white ">
            <div className="h-100 d-flex align-items-center">
              <ThemeProvider theme={defaultTheme}>
                <Container
                  component="main"
                  maxWidth="xs"
                  className="main-side-form"
                >
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      marginBottom: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div className="text-center mb-4">
                      <Link>
                        <img
                          src={logoImg}
                          style={{ width: "185px" }}
                          alt="image"
                        />
                      </Link>
                    </div>
                    <Typography component="h1" variant="h5">
                      Sign up
                    </Typography>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}> 
                        <Grid item xs={12}>
                          <small className="text-danger">{errMsg}</small>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                          />
                        </Grid> 
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="phone"
                            label="Mobile No."
                            name="phone"
                            autoComplete="phone"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
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
                      <div className="d-flex justify-content-between mb-2">
                        <Link className="btn btn-secondary d-flex align-items-center" onClick={
                          ()=>googleSignup()}> 
                        <i className="fa-brands fa-google pe-2 fa-sm"></i>
                        <span className="fs-12"> Sign up with google </span>
                        </Link>
                        <Link className="btn btn-secondary d-flex align-items-center"> 
                        <i className="fa-brands fa-facebook-f pe-2 fa-sm"></i>
                        <span className="fs-12"> Sign up with Facebook</span>
                        </Link> 
                      </div>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link
                            to="/login"
                            variant="body2"
                            className="link-design"
                          >
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </section> 
      : null }
    </>
  );
}
export default  SignUp
