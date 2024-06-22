import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Index from './Index'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'


const PrivateComponenet = () => {
    // const navigate = useNavigate()
    // const auth = localStorage.getItem('usertoken')
    // useEffect(()=>{
    //     if(!auth){
    //         navigate('/login')
    //     }
    // })
  return (
    <> 
    {/* <Navbar/> */}
    <Outlet/> 
    {/* <Footer/> */}
    </>
  )
}

export default PrivateComponenet