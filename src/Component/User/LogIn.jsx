import React, {useEffect, useState} from 'react'; 
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { loginUser } from '../../Api/api';
import { useDispatch } from 'react-redux';
import { cartdata } from '../../redux/slice/cart';
import { wishlistdata } from '../../redux/slice/wishlist';
import { adduser } from '../../redux/slice/user'; 

// import image/icons 
import sideBanner from '/assets/img/sidebanner.jpg'
import logoImg from '/assets/img/logo-dark.png'


const defaultTheme = createTheme();

export default function LogIn() {

  const navigate  = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState()

  const auth = localStorage.getItem('usertoken') 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const data = new FormData(event.currentTarget); 
    const logindata = {"email": data.get('email'), "password": data.get('password')}
    const  resp = await loginUser(logindata)
    if(resp){
      const status = resp.status
      if(status === 203){
        const userrespdata = resp.data
        const id = userrespdata._id
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'registation verification is pending',
          showConfirmButton: false,
          timer: 1500
        }) 
        setIsLoading(false)
        navigate(`/user-verification-check/${id}`)
      }
      else if(status === 200){ 
        const token = resp.data.token
        const userId = resp.data.responsedata._id
        let  userdata = resp.data.responsedata 
        userdata =  JSON.stringify(userdata);
        localStorage.setItem("usertoken", token);
        localStorage.setItem("userdata", userdata);
        const locationHistory = localStorage.getItem("locationHistory")
        navigate(`${locationHistory ? locationHistory : '/'}`) 
        dispatch(cartdata(userId))
        dispatch(wishlistdata(userId))
        dispatch(adduser(resp.data.responsedata)) 
        setIsLoading(false)
        locationHistory ? localStorage.removeItem("locationHistory"):null;
      }
      else{
        setIsLoading(false)
      }
    } 
    else{
      setIsLoading(false)
    }
  };

  
  useEffect(()=>{
      if(auth){
          navigate('/')
      }
  })

  return (

    <>
    <section>
            <div className="row min-vh-100">
                <div className="col-md-6 col-12 sm-none">
                    <div className='h-100'> 
                        <img src={sideBanner} className='overflow-hidden h-100 img-fluid '  alt="image" /> 
                    </div>
                </div>
                <div className="col-md-6 col-12 bg-white">
                    <div className='h-100 d-flex align-items-center'>
                    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"  className='main-side-form'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

            <div className='text-center mb-4'>
                <Link to="/">
                <img src={logoImg} style={{width: '185px'}} alt="image" />
                </Link>
            </div> 
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={event=>handleSubmit(event)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            /> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
              className='bgPrimary'
            >
              Log In 
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" variant="body2" className='link-design'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2" className='link-design'>
                  {"Don't have an account? Sign Up"}
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
    </>
  );
}