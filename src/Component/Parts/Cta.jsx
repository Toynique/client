import React from 'react'
import { Link } from 'react-router-dom' 


const Cta = () => {
    const backgroundStyle = {
        "background": "url('/assets/img/toynique-cta.png')",
        "backgroundSize": "cover",
        "backgroundPosition": "center",
        // "height": "100vh",
        // "paddingTop": "100px",
        // "display": "flex",
    }
    return (
        <>
            {/* <section className=' position-relative'>
                <div className='cta-img-box text-center'>
                    <img src='/assets/img/toynique-cta.png' alt="image" className='img-fluid w-100' />
                </div>
                <div className='position-absolute  top-50 top-0  start-0 translate-middle-y w-100'>
                    <div className="container">
                        <div className="row ">
                            <div className="col-lg-5 col-md-6 col-12">
                                <div className=''>
                                    <h2 className='textPrimary'>Discover the perfect Cuddle Companion for your little ones</h2>
                                    <p>Toynique brings in the collectible range of 10 character cradle cuddler range, available in Pet and Wild line. Tell your little one a lullaby or let them discover the habits and habitats of these toy animal characters, encouraging cognitive development, enhancing motor skills, encouraging hand eye coordination, that too with the comfort of super soft luxuries plush friend we love to call the Cradel Cuddlers. Collect Them all. Love Toynique.</p>
                                    

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section> */}
            <section className=' position-relative py-5' style={backgroundStyle} >
                {/* <div className='cta-img-box text-center'>
                    <img src='/assets/img/toynique-cta.png' alt="image" className='img-fluid w-100' />
                </div> */} 
                    <div className="container">
                        <div className="row ">
                            <div className="col-lg-5 col-md-6 col-12">
                                <div className=''>
                                    <h2 className='textPrimary'>Discover the perfect Cuddle Companion for your little ones</h2>
                                    <p>Toynique brings in the collectible range of 10 character cradle cuddler range, available in Pet and Wild line. Tell your little one a lullaby or let them discover the habits and habitats of these toy animal characters, encouraging cognitive development, enhancing motor skills, encouraging hand eye coordination, that too with the comfort of super soft luxuries plush friend we love to call the Cradel Cuddlers. Collect Them all. Love Toynique.</p>
                                    

                                </div>
                            </div>

                        </div>
                    </div> 
            </section>
        </>
    )
}

export default Cta