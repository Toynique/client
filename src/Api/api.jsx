import React from 'react'
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";  
import { toast } from 'react-toastify';   
import { Url } from "../url/url" ; 
 





export const addUserApi = async (data)=>{
    const navigate = useNavigate() 
    const {name, email, phone, password} = data
    try { 
        if(name && email && phone && password){
        await axios.post(`${Url}/user/add`, data).then((e)=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Signup Success',
                showConfirmButton: false,
                timer: 1500
              }) 
              navigate("/") 
        })
        } 
        else{
            Swal.fire('All fields are required')
        }
    }
    catch (error) {
        console.log(error);
        console.log("User not create");
    }
}

export const userVerifyCheck = async(id)=>{
    try {
        const response = await axios.get(`${Url}/user/checkverify/${id}`) 
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}
export const userAccountVerify = async(id)=>{
    try {
        const response = await axios.post(`${Url}/user/verify-account/${id}`, {"isVerify" : 1})
        console.log("verify account user", response);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Account Verified Success',
            showConfirmButton: false,
            timer: 1500
        }) 
        // return response.data
        return true
    } catch (error) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'something went wrong',
            showConfirmButton: false,
            timer: 1500
        })  
        return false
    }
}

export const loginUser = async(data) =>{
    try {

        const response = await axios.post(`${Url}/user/login`, data)  
        return {"data" :response.data, "status" :response.status} 
    } catch (error) { 
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'something went wrong',
            showConfirmButton: false,
            timer: 1500
        }) 
        return error
    }
}
export const resendVerifyMail = async(id) => {
    try {
        await axios.get(`${Url}/user/resendverifymail/${id}`)  
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'mail send',
            showConfirmButton: false,
            timer: 1500
        })
    } catch (error) { 
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'something went wrong',
            showConfirmButton: false,
            timer: 1500
        })  
    }
}



export const removeCartProduct = async (cartId)=>{
    try {
        await axios.delete(`${Url}/cart/remove/${cartId}`)  
        toast.info("Product Removed" , {autoClose: 1500,});
        return true
    } catch (error) {
        console.log("error: ", error);
    }
}

export const addCartApi = async (userId, productId)=>{
     
    try { 
        const data = await axios.post(`${Url}/cart/add`, {productId, userId}) 
        toast.success("added to Cart",  {autoClose: 1500,})
        return data
        
    } catch (error) { 
        if(error.response.status === 401){
        toast.info(`${error.response.data.message}` , {autoClose: 1500,});
        return error
        }
        return error;
    }
    
    
}
export const productQuantityCart = async(cartId, quantity)=>{
    try {
        const data = await axios.put(`${Url}/cart/quantity/${cartId}`, {quantity}) 
        return data
    } catch (error) {
        return error;
    }
}



export const addWishlistApi = async (userId, productId)=>{
    try {
        const data = await axios.post(`${Url}/wishlist/add`, {productId, userId}) 
        toast.success("Added to Wishlist",  {autoClose: 1500,})
        return data
    } catch (error) { 
        if(error.response.status === 401){
        toast.info(`${error.response.data.message}` , {autoClose: 1500,});
        }
        return error;
    }
}
export const removeWishlist = async (wishlistId)=>{  
     
        try {
            const data = await axios.delete(`${Url}/wishlist/remove/${wishlistId}`)
            toast.info("Product Removed" , {autoClose: 1500,});  
            return data 
        } catch (error) {
            console.log("error: ", error);
            return error
        }  
}


export const checkoutApi = async (obj)=>{
    console.log("api hit");
    const formData = new FormData();
    formData.append("product name", "mobile");
    try {
    
        await axios.post(`${Url}/payment`, obj) 
        toast.success("Added to Wishlist",  {autoClose: 1500,})
        return true
    } catch (error) {  
        console.log("api payment error", error);
        return error;

        
    }
}
 







export const googleSignup = async ()=>{
    try {
        await axios.post(`${Url}/user/googleauth`, data) 
        console.log("google signup function called");

    } catch (error) {
        console.log("error: ", error);
    }
}
