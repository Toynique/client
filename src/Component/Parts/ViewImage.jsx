import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";
import "../../Css/ViewImage.css"
import "swiper/css";
import { useEffect, useMemo, useState } from "react";
import ReactImageMagnify from 'react-image-magnify'; 

 
export default function ViewImage(props) {
 
  const {images } = props  


 
   
  const smallSlideBox =  ()=>{
    const adjustSlides = () => {
      const boxes = document.getElementsByClassName('swiper-slide');
      const length = boxes.length; 
      for (let i = 0; i < length; i++) {
        let elem = boxes[i]; 
        if (window.innerWidth > 1025) {
          if (elem && elem.offsetHeight) {
            elem.style.width = `${elem.offsetHeight}px`; 
          }
        } else {
          if (elem && elem.offsetWidth) {
            elem.style.height = `${elem.offsetWidth}px`; 
          }
        }
      }
    }
    adjustSlides();
};
  
  const [imagesNavSlider, setImagesNavSlider] = useState([]);
  const [slideSrc, setSlideSrc] = useState('') 

  useEffect(()=>{
    smallSlideBox()
  }, [images])
  useEffect(()=>{
    setSlideSrc(( images && `${images.images[0]}`))
  }, [images])
  return (
    <>
    <div className="viewimagewrap">
      <section className="slider">
        <div className="slider__flex">
          <div className="slider__col">
            <div className="slider__prev cl-blue fw-bold">Prev</div>

            <div className="slider__thumbs">
              <Swiper
                onSwiper={setImagesNavSlider}
                direction="vertical"
                spaceBetween={24}
                slidesPerView={4}
                mousewheel={true}
                navigation={{
                  nextEl: ".slider__next",
                  prevEl: ".slider__prev"
                }}
                className="swiper-container1"
                breakpoints={{
                  0: {
                    direction: "horizontal",
                    slidesPerView : 3
                  },
                  1025: {
                    direction: "vertical"
                  }
                }}
                modules={[Navigation, Thumbs, Mousewheel]}
              >
                {images && images.images.map((slide, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="slider__image"> 
                        <img src={`${slide}`} alt={images.altTag || "image"} onMouseEnter={e=>setSlideSrc(e.target.src)} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            <div className="slider__next cl-blue fw-bold">Next</div>
          </div>

          <div className="slider__images" >
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: images ? images.altTag : "image",
                        isFluidWidth: true,
                        src: images && slideSrc
                    },
                    largeImage: {
                        src: slideSrc,
                        width: 1200,
                        height: 1200
                    }
                }} style={{zIndex: '1', top:'100%'}} />
                {/* <img src={slideSrc} alt="" className="img-fluid" /> */}
          </div>
        </div>
      </section>
      </div>


    
    </>
  );
 
}
