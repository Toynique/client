
import './App.css' 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import {useDispatch} from 'react-redux' 


// All pages 
import Index from './Component/User/Index'; 
import SignUp from './Component/User/SignUp';
import LogIn from './Component/User/LogIn';
import Cart from './Component/User/Cart';
import Forgot from './Component/User/Forgot'; 
import Profile from './Component/User/Profile';
import WishList from './Component/User/WishList'; 

import {categorydata} from './redux/slice/category'
import {subcategorydata} from './redux/slice/subcategory'
import {productdata} from './redux/slice/product'
import {cartdata} from './redux/slice/cart'
import {wishlistdata} from './redux/slice/wishlist'


import VerifyAccountGmail from './Component/User/VerifyAccountGmail';
import VerifactionCheck from './Component/User/VerifactionCheck';
import PrivateComponenet from './Component/User/PrivateComponenet';
import PrivacyPolicy from './Component/User/PrivacyPolicy';
import Term from './Component/User/Term';
import Refund from './Component/User/Refund';
import { adduser } from './redux/slice/user'; 
import ScrollToTop from './scrollToTop';
import Blog from './Component/User/Blog';
import { blogdata } from './redux/slice/blog';
import BlogView from './Component/User/BlogView';
import ShipingPolicy from './Component/User/ShippingPolicy';
import { addressdata } from './redux/slice/address';
import { characterdata } from './redux/slice/character';
import { subcharacterdata } from './redux/slice/subcharacter';
import ProductView from './Component/User/ProductView';
import ProductsPage from './Component/User/ProductsPage';
import ProductsCategory from './Component/User/ProductsCategory';
import ProductsCharacter from './Component/User/ProductsCharacter';
import { ratingdata } from './redux/slice/rating';
import CartWithoutAuth from './Component/User/CartWithoutAuth';
import CheckoutWithoutAuth from './Component/User/CheckoutWithoutAuth';
import { bannerdata } from './redux/slice/banner';
import ConfirmOrder from './Component/User/ConfirmOrder';
import PaymentFailed from './Component/User/PaymentFailed';
import Quickbuy from './Component/User/Quickbuy';

function App() {
  const dispatch = useDispatch()
  const userData = localStorage.getItem('userdata')
   
  const cartDispatch = ()=>{
    if(userData){
      const userJson = JSON.parse(userData)
      const userId = userJson._id 
      
      dispatch(cartdata(userId))
      dispatch(wishlistdata(userId))
      dispatch(adduser(userJson))
      dispatch(addressdata(userId))
    }
  }

  useEffect(()=>{
    dispatch(bannerdata())  
    dispatch(categorydata())  
    dispatch(subcategorydata())  
    dispatch(characterdata())  
    dispatch(subcharacterdata())  
    dispatch(productdata())  
    dispatch(blogdata())  
    dispatch(ratingdata())  
  }, []) 

  useEffect(()=>{
    cartDispatch()
  }, [userData])
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/> 
      <Routes>
      <Route path="/" element={<PrivateComponenet/>} >
        <Route index element={<Index/>} /> 
        <Route path="cart" element={<Cart/>} />  
        <Route path="profile" element={<Profile/>} />
        <Route path="wishlist" element={<WishList/>} /> 
        <Route path="productview/:slug/:productId" element={<ProductView/>} />
        <Route path="products/category/:category" element={<ProductsCategory/>} />
        <Route path="products/character/:character" element={<ProductsCharacter/>} />
        <Route path="products" element={<ProductsPage/>} />   
      </Route> 

      <Route path="/order-confirmed/:orderId" element={<ConfirmOrder/>} />
      <Route path="/quick-buy/:productId" element={<Quickbuy/>} />
      <Route path="/payment-failed" element={<PaymentFailed/>} />
      <Route path="/my-cart" element={<CartWithoutAuth/>} />
      <Route path="/checkout" element={<CheckoutWithoutAuth/>} />
      <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      <Route path="/term" element={<Term/>} />
      <Route path="/refund-cancellation" element={<Refund/>} />
      <Route path="/shipping-policy" element={<ShipingPolicy/>} /> 
      <Route path="/blog" element={<Blog/>} />
      <Route path="/blog/:blogSlug/:blogId" element={<BlogView/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/forgot-password" element={<Forgot/>} />
      <Route path="/user-verify/:id" element={<VerifyAccountGmail/>} />
      <Route path="/user-verification-check/:id" element={<VerifactionCheck/>} /> 
      </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App


