import React from 'react'
import { useSelector } from 'react-redux';
import Slider from "react-slick";

const HeaderSlider = () => {

  const bannerAllData = useSelector(d=>d.banner.data)

  var settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  const imgArr = ["banner1.jpg", "banner1.jpg"]
  // const imgSmArr = ["banner-sm1.jpg"] 
  const imgSmArr = ["banner-sm1.jpg", "banner-sm1.jpg"]
  const imgmdArr = ["banner-md1.jpg", "banner-md1.jpg"]

  return (
    <>
      <section className='position-relative slider-header-wrap w-100'>
        {/* <Slider {...settings} className='w-100'>
          {imgArr.map((img, i) => {
            return (
              <div className='header-slider' key={i}>
                <div key={i} className=''> 
                  <picture> 
                    <source srcSet={`./assets/img/${imgSmArr[i]}`} media="(max-width: 476px)" />
                    <source srcSet={`./assets/img/${imgmdArr[i]}`} media="(max-width: 768px)" />
                    <img src={`./assets/img/${img}`} alt="Banner Image" loading='lazy' className='img-fluid w-100' />
                  </picture>

                </div>
              </div>
            )
          })}
        </Slider> */}
        <Slider {...settings} className='w-100'>
          {bannerAllData.map((bannerValue, i) => { 
            return (
              <div className='header-slider' key={i}>
                <div key={i} className=''> 
                  <picture> 
                    
                    
                    <source srcSet={bannerValue.bannerSm} media="(max-width: 576px)" />
                    <source srcSet={bannerValue.bannerMd} media="(max-width: 768px)" />
                    <img src={bannerValue.bannerLg} alt="Banner Image" loading='lazy' className='img-fluid w-100' /> 
                  </picture>

                </div>
              </div>
            )
          })}
        </Slider>
        {/* <div className=' position-absolute  top-50 top-0  start-0 translate-middle-y w-100 py-md-0 py-4'>
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-8 col-sm-10 col-12">
                <h1 className='textPrimary'>Discover the perfect cuddle companion for your little one </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore totam amet quo ipsum veritatis.</p>
                <button className='rounded-pill btn btnPrimary py-1 px-4'>Explore Now</button>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  )
}

export default HeaderSlider