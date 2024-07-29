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
    const subCharacterAllData = useSelector(store => store.subcharacter.data)
    return (
        <>
            <section className='footer-top-wrap bgPrimary pt-5 pb-4 '>
                <div className="container">
                    <div className="row align-items-center mb-lg-5 mb-3"> 
                        <div className="col-lg-4 mb-lg-0 mb-3">
                            <img src="/assets/img/logo-white.png" alt="logo" className='img-fluid' width={200} />
                        </div>
                        <div className="col-lg-8 col-12">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-md-6 col-12 mb-lg-0 mb-3">
                                    <ul className='p-0'>
                                        {subCharacterAllData && subCharacterAllData.map((cv, i) => {
                                            let characterSlug = (cv.character).toLowerCase().replace(/\s+/g, '-');
                                            characterSlug = characterSlug.replace(/[^\w-]/g, '');
                                            characterSlug = characterSlug.replace(/--+/g, '-');
                                            characterSlug = characterSlug.replace(/^-+|-+$/g, '');
                                            return (
                                                <li key={i}><Link className='text-white text-uppercase' to={`/products/character/${characterSlug}?subcharacter=${cv.subcharacter}`}>{cv.subcharacter}</Link></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="col-md-6 col-12">
                                    <ul className='text-white p-0'>
                                        <li className='d-flex gap-2'><p className=''><i className="fa-solid fa-envelope text-white"></i> :</p> <p className=''>happiness@toyniquetoys.com</p></li>
                                        <li className='d-flex gap-2'><p className=''><i className="fa-solid fa-phone text-white"></i>  : </p> <p className=''>+91 70113 97408</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-center gap-lg-5 gap-2 flex-wrap'>
                        <Link className='text-white' to="/privacy-policy">Privacy Policy</Link>
                        <Link className='text-white' to="/term">Terms of Service</Link>
                        <Link className='text-white' to="/refund-cancellation">Cancellation & Refund Policy</Link>
                        <Link className='text-white' to="/shipping-policy" >Shipping Policy</Link>
                        <Link className='text-white' to="/blog" >Blog</Link>
                    </div>
                </div>
            </section>
            <section className="footer-bottom-wrap bg-black">
                <div className="container">
                    <div className="text-center text-white py-2">
                        <p className='mb-0'>&copy;Copyright; All right reserved | Toynique </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer