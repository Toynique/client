import * as React from 'react';
import {useDispatch} from 'react-redux'
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography'; 
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { addCartApi, removeWishlist } from '../../Api/api';
import { ImageUrl, Url } from '../../url/url';
import {wishlistdata} from '../../redux/slice/wishlist'
import { ToastContainer, toast } from 'react-toastify';
import { cartdata } from '../../redux/slice/cart';

export default function WishList() { 
    const wishlistalldata = useSelector(store => store.wishlist.data)
    const productalldata = useSelector(store => store.product.data)
    const dispatch = useDispatch()


    const navigate = useNavigate()
    const auth = localStorage.getItem('usertoken')
    
    const removewish = async(wishlistId)=>{
        const userdata = localStorage.getItem('userdata')
        if(userdata){
            const userdataobj = JSON.parse(userdata) 
            const userId = userdataobj._id    
            await removeWishlist(wishlistId)
            dispatch(wishlistdata(userId))
        }
        
    }

    const addtocart = async(product, wishlistId)=>{
        if(product.totalProduct > 0){
        const userdata = localStorage.getItem('userdata')  
        if(userdata){  
            const userdataobj = JSON.parse(userdata) 
            const userId = userdataobj._id   
            await addCartApi(userId, product._id).then(()=>removeWishlist(wishlistId)).then(()=>{ 
                dispatch(wishlistdata(userId))
                dispatch(cartdata(userId)) 
            })
        } }
        else{
            toast.warning("Product Out Of Stock",  {autoClose: 1500,})
          }
    }
    const stringToSlug = (str) => {
        return str
          .toLowerCase()  
          .replace(/\s+/g, '-')  
          .replace(/[^\w-]+/g, '')  
          .replace(/--+/g, '-')  
          .trim();  
      };
    
    React.useEffect(()=>{
        if(!auth){
            navigate('/login')
        }
    })
  return (

    <>
    <ToastContainer />
    <Navbar/>
    {wishlistalldata.length > 0 ?
    <section className='py-5'>
        <div className="container">
            <h2 className='text-muted text-center mb-4' >Wishlist</h2>
            <div className="row">  
                { wishlistalldata.map((cv, i)=>{
                    const product = productalldata.find(data => data._id === cv.productId) 
                    return( 
                    <div className="col-lg-3 col-xl-3  col-md-6 col-6 mb-3" key={i}>
                        {(product || product != undefined) ? 
                        <div className=" p-2 "> 
                        <div className='text-center d-block product-img-box'>
                            <Link to={`/productview/${product.slug}/${product._id}`}>
                                <img src={`${product.thumbnailImage}`} alt={product.altTag || "image"} className='img-fluid h-100 w-100'/>
                            </Link>
                            <div className="saveicon"> 
                            <button className=' btn border-0 p-1 lh-1 text-muted carticon fw-bold removecartbtn'  onClick={()=>removewish(cv._id)}><i className="fa-solid fa-circle-xmark bg-secoundary fa-xl"/></button>
                            </div> 
                            { product.discount > 0 ?
                            <div className="newIcon position-absolute top-0 start-0 bgDanger text-white py-0 px-lg-2 px-1  text-uppercase fs-12">  
                                <small className='text-uppercase align-items-center'>Flat {product.discount} 
                                </small>
                            </div>: null}
                            {!(product.totalProduct > 0) ?
                            <div className="position-absolute bottom-0 start-50 translate-middle-x bgPrimarySecond text-white px-3 text-uppercase max-width">out of stock</div>:null}
                        </div>
                        <div className='category-name-box'> 
                            <Link to={`/productview/${product.slug}/${product._id}`} className='pt-2 d-block text-center mb-2 fs-xs-10'>{product.productName}</Link>
                        </div>
                        <div className='d-flex mb-3 align-items-end justify-content-center gap-3'>
                            
                            { product.discount > 0 && <p className='text-decoration-line-through cl-welcome mb-0 fw-normal fs-14 fs-xs-10'><i className="fa-solid cl-welcome fs-12 fa-indian-rupee-sign fa-sm fs-xs-9"/> {product.salePrice}</p>   }

                            { product.salePrice < product.mrp && <small className='text-decoration-line-through fs-12 fs-xs-9'>{product.mrp}</small>   }  

                            <p className='mb-0 fs-xs-10 fw-bold'><i className="fa-solid fa-indian-rupee-sign "></i> 
                            {product.totalProduct > 0 ? product.discount > 0 ? product.salePrice - Math.ceil(product.salePrice * product.discount/100) : product.salePrice : product.salePrice}
                            </p>

                            { product.discount > 0?<small className=' fs-12 cl-welcome fs-xs-9'>({product.discount} % off)</small>:null}
                        </div>
                        <div className="text-center">
                        {product.totalProduct > 0 &&
                        <button className='btn btn-blue me-2 btn-s mb-2 text-capitalize' onClick={()=>addtocart(product, cv._id)}><i className="fa-solid fa-cart-shopping fa-lg"></i> move to cart </button>}
                        {!(product.totalProduct > 0) &&
                        <Link to={`/products/category/${stringToSlug(product.category)}`} className='btn btn-blue me-2 btn-s mb-2 text-capitalize'><i className="fa-solid fa-cart-shopping fa-lg"></i> Show similar </Link>}
                        </div>
                        
                    </div>
                         : null}
                    </div>  
                    ) 
                })} 
 
            </div>
        </div>
    </section>:
    <section>
        <div className="container">
            <div className="min-h-400 d-flex align-items-center justify-content-center">
                <div className='text-center'>
                    <h2 className='text-uppercase pb-2 border-bottom'>YOUR WISHLIST IS EMPTY</h2>
                    <div className="row mb-3">
                        <div className="offset-lg-2 offset-md-1 col-lg-8 col-md-10 col-12">
                    <p >Add your favourite items to your wishlist to review and add them to your cart anytime!</p>
                        </div>
                    </div>
                    <Link to="/" className="emptyWishlistbtn text-uppercase bgPrimarySecond text-white rounded-pill px-3 py-2 border-0">
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>
        </div>
    </section>
    }
    <Footer/> 
    </>
  );
}