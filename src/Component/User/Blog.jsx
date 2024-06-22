import React from 'react'
import { Link } from 'react-router-dom' 
import Cta from '../Parts/Cta'; 
import Footer from '../Footer/Footer';
import Navbar from '../Header/Navbar';
import {  useSelector } from 'react-redux';
import { Url } from '../../url/url'; 
import { ToastContainer } from 'react-toastify'; 

const Blog = () => { 
    const blogAllData = useSelector(store => store.blog.data)  

    const formatDate = (isoDate) => {
        const dateObj = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString(undefined, options);
      }; 
  return (
    <>
    <Navbar/> 
    <ToastContainer />  
    {/* <section> 
        <img src="/assets/img/dream-CATAGORY.webp" alt="image" />  
    </section> */}

    <h2 className="text-center pt-5 border-bottom pb-4 textPrimary">
        Blogs
    </h2>
        
    <section className='pb-5 pt-4'>
        <div className="container">
        <h2 className="text-center text-uppercase cl-blue fw-bold mb-4"></h2>
            <div className="row">
                {blogAllData && blogAllData.map((cv, i)=>{
                    return(
                        <div key={i} className=' px-2 col-xl-3 col-lg-3 col-md-4 col-6 px-3 mb-3 '>
                            <div className="shadow">
                                <div className='text-center d-block px-3 pt-3 product-img-bo rounded-top'>
                                    <Link to={`/blog/${cv.slug}/${cv._id}`}>
                                        <img src={`${cv.image}`} alt={cv.altTag} className=' categorty-im w-100 img-flid m-auto rounded-top' />
                                    </Link> 
                                </div>
                                <div className="px-3 py-2">
                                <div className='d-flex align-items-center'>
                                    <small className='text-muted fs-12'> {formatDate(cv.createdAt)}  </small> 
                                </div>
                                <div className='category-name-box '>
                                    <Link to={`/blog/${cv.slug}/${cv._id}`} className='pt-2 d-block '><p  className='fs-sm-14 mb-2'>  {cv.title}</p></Link>
                                </div>
                                
                                </div>
                                 
                            </div>
                        </div> 
                    )
                })}
            </div>
        </div>
    </section>
    <Cta/> 
    <Footer/>
    </>
  )
}

export default Blog