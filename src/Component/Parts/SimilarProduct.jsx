import React from 'react'
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { Url } from '../../url/url';
import { addCartApi, addWishlistApi } from '../../Api/api';
import { cartdata } from '../../redux/slice/cart';
import { wishlistdata } from '../../redux/slice/wishlist';
import { toast } from 'react-toastify';


const SimilarProduct = (props) => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
    let arr = [1, 2, 3, 4,5 ,6, 7, 8]
    const ProductAllData = useSelector(store => store.product.data)
    var settings = {
        dots: false,
        infinite: true,
        autoplay : true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows : false,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2,
            }
          }
        ]
      }; 


      const addWishlistFunc = async(productId)=>{ 
        const userdata = localStorage.getItem('userdata') 
        if(userdata){
            const userdataobj = JSON.parse(userdata) 
            const userId = userdataobj._id   
            await addWishlistApi(userId, productId).then(()=>{ 
                dispatch(wishlistdata(userId))
            })
        }  
    }
    const addtocart = async(product)=>{
        if(product.totalProduct > 0){
        const userdata = localStorage.getItem('userdata') 
        if(userdata){  
            const userdataobj = JSON.parse(userdata) 
            const userId = userdataobj._id   
            await addCartApi(userId, product._id).then(()=>{ 
                dispatch(cartdata(userId))
            })
        } }
        else{
          toast.warning("Product Out Of Stock",  {autoClose: 1500,})
        }

    }
  return (
    <>
    <section className='py-5 bg-lightgray'>
        <div className="container">
            <h2 className="text-center text-uppercase cl-blue fw-bold">Similar Products</h2>
            <div className='mt-4'>
            <Slider {...settings}>
                {ProductAllData.filter(item=> item.category === props.category).splice(0, 15).map((cv, i)=>{
                return (  
                <div key={i} className=' px-2'>
                    <Link className='text-center d-block no-outline product-img-box' to={`/${cv.category}/${cv._id}/${cv.slug}`}> 
                        <img src={`${Url}/${cv.thumbnailImage}`} alt={cv.altTag || "image"} className='rounded-3 categorty-img m-auto no-outline'/>
                        <div className="saveicon">
                        <button className='me-2 no-outline btn m-0 p-0 border-0 text-muted wishicon d-block mb-1' onClick={()=>addWishlistFunc(cv._id)}><i className="fa-regular fa-heart  fs-20 fs-sm-15"></i></button>
                        <button className='me-2 btn no-outline border-0 text-muted p-0 m-0 carticon d-block' onClick={()=>addtocart(cv)}><i className="fa-solid fa-cart-shopping fs-sm-15 fs-20"></i></button>
                        </div>
                    </Link>
                    <div className='category-name-box'>
                        <Link className='pt-2 d-block '  to={`/${cv.category}/${cv._id}/${cv.slug}`}><p  className=' fs-sm-14 mb-2'>{cv.productName} ({cv.type})</p></Link>
                    </div>
                    <div className='d-flex align-items-center'>
                        <p className='fw-bold me-2'><i className="fa-solid cl-blue fa-indian-rupee-sign"></i> {cv.salePrice}</p>
                        {cv && cv.salePrice < cv.mrp ?
                        <> 
                        <small className='text-decoration-line-through'>{cv && cv.mrp}</small>  
                        </> 
                        : null }  
                    </div>
                    <div className='d-flex align-items-center'>
                      <Rating name="half-rating-read" defaultValue={4.56} precision={0.5} readOnly />
                      <small className='ms-2'>(534)</small>
                    </div>
                </div>  
                )
                })}  
            </Slider>
            </div>
        </div>
    </section>
    </>
  )
}

export default SimilarProduct