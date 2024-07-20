import React, { useEffect, useState } from 'react'
import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom' 
import Footer from '../Footer/Footer';
import Navbar from '../Header/Navbar';
import {   useSelector } from 'react-redux';
import { Url } from '../../url/url'; 
import { ToastContainer } from 'react-toastify'; 
import parse from 'html-react-parser';

const BlogView = () => { 

    const blogAllData = useSelector(store => store.blog.data)
    const [blogData, setBlogData] = useState()

    const { blogId} = useParams()  
 
    
    const getBlogFunc = async()=>{ 
        const response = await blogAllData.find(datafind=>datafind._id === blogId) 
        setBlogData(response) 
    }
    useEffect(()=>{
        getBlogFunc()
    })
 
  return (
    <>
    <Navbar/> 
    <ToastContainer />   

    <section className='py-5'>
        <div className="container">
            <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                    <div>
                    <MDBBreadcrumb>
                        <MDBBreadcrumbItem>
                        <Link to="/" > <i className="fa-solid fa-house"></i> Home</Link>
                        </MDBBreadcrumbItem> 
                        <MDBBreadcrumbItem>
                        <Link to="/blog" >Blog</Link>
                        </MDBBreadcrumbItem> 
                        <MDBBreadcrumbItem active>{blogData && blogData.title}</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                    </div>  
                </div>
            </div>
        </div>
    </section>

    <section>
        <div className="container">
            <div className="row">
                <div className="col-lg-9 col-md-8 col-12 mb-3">
                    <div className='mb-5 border-bottom pb-3'>
                        <h1>{blogData && blogData.title} </h1>
                    </div>
                    <div>
                        <img src={`${blogData && blogData.image}`} className='w-50 m-auto d-block img-fluid' alt={blogData && blogData.altTag} />
                    </div>
                    <div>
                        {blogData && parse(blogData.description)} 
                    </div>
    
                </div>
                <div className="col-lg-3 col-md-4 col-12 mb-3">
                    <div>
                        <h5 className='mb-4 bg-dark text-white text-uppercase px-2 py-1'>recent blogs</h5>
                        <div>
                            {blogAllData && blogAllData.slice(0,20).map((blogValue)=>{
                                return(
                                    <div className='py-3 d-flex border-bottom-not-last align-items-center gap-3' key={blogValue._id}>
                                        <div className='recent-blog-img-box m-auto'>
                                            <img src={`${blogValue.image} `} alt={blogValue.altTag} className=' img-fluid ' />
                                        </div>
                                        <h6>{blogValue.title} </h6>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
         
    
    <Footer/>
    </>
  )
}

export default BlogView