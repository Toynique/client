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
                                    <h2 className='textPrimary'>Discover the perfect Cuddle Companion for your little ones</h2>
                                    <p>Toyniue brings in the collectible range of 10 charachetr cradle cuddler range, available in Pet and Wild line. Tell your little one a lullaby or let them discover the habits and habitats of these toy animal characters, encouraging cognitive development, enhancing motor skills, encouracing hand eye corrdination, that too with the comfort of super soft luxurious plush friend we love to call teh Cradel Cuddlers. Collect them all. Love Toynique.</p>
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