import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'; 

import sideBanner from '/assets/img/sidebanner.jpg'  
import logoImg from '/assets/img/logo-dark.png'

const defaultTheme = createTheme();

export default function Forgot() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
    <section>
            <div className="row min-vh-100">
                <div className="col-md-6 col-12 sm-none">
                    <div className='h-100'> 
                        <img src={sideBanner} className='overflow-hidden h-100 img-fluid'  alt="forgot Password" />
                    </div>
                </div>
                <div className="col-md-6 col-12 bg-white ">
                    <div className='h-100 d-flex align-items-center'> 
                   
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className='main-side-form'>
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
                <Link >
                <img src={logoImg} style={{width: '185px'}} alt="image" />
                </Link>
            </div>
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="p" variant="p">
            Forget your password ? 
          </Typography>
          {/* <h4 className='text-center'> Forget YOur Password ?</h4> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login" variant="body2" className='link-design '>
                <i className="fa-solid fa-arrow-left-long pe-2"></i>  Back to Log In
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