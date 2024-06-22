import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import phoneIcon from '/assets/icon/phone_icon.svg'
import emailIcon from '/assets/icon/email_icon.svg'
import addressIcon from '/assets/icon/addess_icon.svg'
import phoneImg from '/assets/icon/phone.png'

const Footer = () => {
    const categoryAllData = useSelector(store => store.category.data)
    const characterAllData = useSelector(store => store.character.data)
  return (
    <>
    <section className='footer-top-wrap bg-dark pt-5 pb-4'>
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-6">
                    {/* <h3>Heading</h3> */}
                    <ul className='text-white'>
                        <li><Link className='text-white' to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link className='text-white' to="/term">Terms of Service</Link></li>
                        <li><Link className='text-white' to="/refund-cancellation">Cancellation & Refund Policy</Link></li>
                        <li><Link className='text-white' to="/shipping-policy" >Shipping Policy</Link></li> 
                        <li><Link className='text-white' to="/blog" >blog</Link></li> 
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6 col-6">
                    {/* <h3>Heading</h3> */}
                    <ul>
                        {characterAllData && characterAllData.map((cv, i)=>{ 
                            let characterSlug = (cv.character).toLowerCase().replace(/\s+/g, '-'); 
                                characterSlug = characterSlug.replace(/[^\w-]/g, ''); 
                                characterSlug = characterSlug.replace(/--+/g, '-'); 
                                characterSlug = characterSlug.replace(/^-+|-+$/g, '');  
                            return(
                                <li key={i}><Link className='text-white text-uppercase' to={`/products/character/${characterSlug}`}>{cv.character}</Link></li>
                            )
                        })} 
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6 col-6">
                    {/* <h3>Heading</h3> */}
                    <ul>
                        {categoryAllData && categoryAllData.map((cv, i)=>{ 
                            let categorySlug = (cv.category).toLowerCase().replace(/\s+/g, '-'); 
                                categorySlug = categorySlug.replace(/[^\w-]/g, ''); 
                                categorySlug = categorySlug.replace(/--+/g, '-'); 
                                categorySlug = categorySlug.replace(/^-+|-+$/g, ''); 
                                // return categorySlug;
                            return(
                                <li key={i}><Link className='text-white text-uppercase' to={`/products/category/${categorySlug}`}>{cv.category}</Link></li>
                            )
                        })} 
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6 col-6">
                    {/* <h3>Heading</h3> */}
                    <ul className='text-white'> 
                        <li className='d-flex gap-2'><p className=' max-width'><i className="fa-solid fa-location-dot text-white"></i> : </p> <p className=''> Sector - 65, Noida, Uttar Pradesh (INDIA)</p></li>
                        <li className='d-flex gap-2'><p className=''><i className="fa-solid fa-envelope text-white"></i> :</p> <p className=''>support@gmail.com</p></li>
                        <li className='d-flex gap-2'><p className=''><i className="fa-solid fa-phone text-white"></i>  : </p> <p className=''>+91 0000000000</p></li> 
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section className="footer-bottom-wrap bg-black">
        <div className="container">
            <div className="text-center text-white py-2">
                <p className='mb-0'>&copy;Copyright; All right reserved  | Design & Developed By <a href="http://teamlans.com" className='text-primary' target="_blank" rel="noopener noreferrer">Teamlans</a>  </p>
            </div>
        </div>
    </section>
    </>
  )
}

export default Footer