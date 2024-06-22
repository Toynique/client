import React, { useEffect, useState, Suspense, lazy } from 'react'
import { ToastContainer } from 'react-toastify';
import HeaderSlider from '../Slider/HeaderSlider'
import Cta from '../Parts/Cta'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'


// import video1 from '/assets/video/vid1.mp4'
// import video2 from '/assets/video/vid2.mp4'
// import video3 from '/assets/video/vid3.mp4'
// import video4 from '/assets/video/vid4.mp4'
// import poster1 from '/assets/video/poster1.png'
// import poster2 from '/assets/video/poster2.png'
// import poster3 from '/assets/video/poster3.png'
// import poster4 from '/assets/video/poster4.png'
// import VideoPlayer from '../Parts/VideoPlayer'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductSmall from '../Parts/ProductSmall';
const LazyLoadedVideo = lazy(() => import('../Parts/VideoPlayer'));

const Index = () => {
  const productAllData = useSelector(store => store.product.data)
  const blogAllData = useSelector(store => store.blog.data)
  // const [bestDealProduct, setBestDealProduct] = useState([])

  // const bestDealFunc = async () => {
  //   const response = await productAllData.filter(value => (Number(value.salePrice) < Number(value.mrp)) || Number(value.discount) > 0)
  //   setBestDealProduct(response)
  // }
  // useEffect(() => {
  //   bestDealFunc()
  // }, [productAllData])

  return (
    <>
      <ToastContainer />
      <Navbar />
      <HeaderSlider />

      <section className='py-md-0 py-4'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12 mb-md-0 mb-2">
              <div>
                <h2 className='textPrimary'>
                  Tounique's Tiny Smiles, big hugs
                </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid tempore dolores obcaecati modi distinctio officia autem ipsam dolorem, dignissimos saepe facere delectus, amet consequuntur quos maiores animi ducimus deserunt expedita repellat quo natus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugiat maiores voluptatem! Saepe alias placeat voluptates architecto accusamus earum, sequi, pariatur fuga vitae vel voluptatibus corrupti quo corporis aut aperiam eius numquam tempore necessitatibus provident. Optio.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-md-0 ">
              <div>
                <img src="/assets/img/toynique-about.png" alt="image alt tag" className='img-fluid w-100' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* video section  */}
      {/* <section className='py-5'>
        <div className="container">
          <div className="d-flex mb-4 justify-centent-center align-items-center ">
            <div className=" flex-grow-1 border borderPrimarySecond "></div>
            <h2 className="  text-center px-2 text-uppercase fw-bold cl-welcome">welcome</h2>
            <div className=" flex-grow-1 border borderPrimarySecond"></div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-sm-7 col-12">
              <div className="mb-3">
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyLoadedVideo videoPath={video1} posterPath={poster1} />
                </Suspense>
              </div>
            </div>
            <div className="col-lg-4 col-sm-5 col-12">
              <div className="mb-3">
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyLoadedVideo videoPath={video2} posterPath={poster2} />
                </Suspense>
              </div>
              <div className="">
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyLoadedVideo videoPath={video3} posterPath={poster3} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

      </section> */}
      {/* <Cta /> */}

      {productAllData.length > 0 ?
        <section className='py-5'>
          <div className="container">
            <div className="d-flex justify-centent-center align-items-center  mb-5">
              <div className=" flex-grow-1 border borderPrimarySecond "></div>
              <h2 className="  text-center px-2 text-uppercase fw-bold fs-42 cl-welcome">cradle cudders</h2>
              <div className=" flex-grow-1 border borderPrimarySecond"></div>
            </div>
            <div className="row">
              <div className="row">
                {productAllData && productAllData.filter(val => val.totalProduct > 0).map((cv, index) => {
                  return (
                    <div key={index} className='col-lg-3 col-sm-4 col-6 p-2'>
                      <ProductSmall productData={cv} />
                    </div>
                  )
                })}
              </div>

            </div>
            <div className="text-center mt-5">
              <Link to='/products' className="homebtn">
                Show More
              </Link>
            </div>
          </div>

        </section> : null}

      <Cta />


      {blogAllData.length > 0 ?
        <section className='py-5'>
          <div className="container">
            <div className="d-flex justify-centent-center align-items-center  mb-5">
              <div className=" flex-grow-1 border borderPrimarySecond "></div>
              <h2 className="  text-center px-2 text-uppercase fw-bold fs-42 cl-welcome">Blogs</h2>
              <div className=" flex-grow-1 border borderPrimarySecond"></div>
            </div>
            <div className="row">
              {blogAllData && blogAllData.slice(0, 3).map((blogValue, index) => {
                return (
                  <div className='col-lg-3 col-sm-4 col-6 p-2' key={blogValue._id}>
                    <div className=' '>

                      <Link to={`/blog/${blogValue.title}/${blogValue._id}`}>
                        <img src={blogValue.image} alt={blogValue.altTag} className='img-fluid' />
                      </Link>
                      <div className='p-1'>
                        <Link to={`/blog/${blogValue.title}/${blogValue._id}`}>
                          <h5 className='textPrimary'>{blogValue.title}</h5>
                        </Link>
                        <p className='mb-0'>{blogValue.shortDescription}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-5">
              <Link to='/blog' className="homebtn">
                Show More
              </Link>
            </div>
          </div>

        </section> : null}




      {/* this is video section  */}
      {/* <section className='pb-5'>
        <div className="container">
          <div className="d-flex justify-centent-center align-items-center ">
            <div className=" flex-grow-1 border borderPrimarySecond "></div>
            <h2 className="  text-center px-2 text-uppercase fw-bold cl-welcome">our community</h2>
            <div className=" flex-grow-1 border borderPrimarySecond"></div>
          </div>
          <div className='mt-5'> 
            <Suspense fallback={<div>Loading...</div>}>
              <LazyLoadedVideo videoPath={video4} posterPath={poster4} />
            </Suspense>
          </div>
        </div>

      </section> */}

      <Footer />

    </>
  )
}

export default Index