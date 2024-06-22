import React from 'react'
import { Link } from 'react-router-dom'
import savePlanetImg from '/assets/img/save-planet.avif'


const Cta = () => {
    return (
        <>
            <section className=' position-relative'>
                <div className='cta-img-box text-center'>
                    <img src='/assets/img/toynique-cta.png' alt="image" className='img-fluid w-100' />
                </div>
                <div className='position-absolute  top-50 top-0  start-0 translate-middle-y w-100'>
                    <div className="container">
                        <div className="row ">
                            <div className="col-lg-5 col-md-6 col-12">
                                <div className=''>
                                    <h2 className='textPrimary'>Discover the prefect cuddle campaion for your little one</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti laborum voluptates quia? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam aliquid provident quisquam.</p>
                                    {/* <p className="text-uppercase cta-line1 ">Discover the prefect cuddle campaion for your little one</p> */}
                                    {/* <p className="text-uppercase cta-line2 ">army to save</p> */}
                                    {/* <p className="text-uppercase cta-line3  cl-pink">planet</p>  */}
                                    {/* <button className='cta-btn  '>Join Now</button> */}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cta