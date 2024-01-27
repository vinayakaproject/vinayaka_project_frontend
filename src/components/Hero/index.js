import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import bappa2Img from '../../assets/bappa2.png';
import girl2Img from '../../assets/girl22.png';
import bothImg from '../../assets/both1.png';

const SwiperShow = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      centeredSlides
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      touchEventsTarget="container"
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      style={{
        width: '100%',
        height: '100%',
        background: 'black',
        zIndex: -10,
      }}
    >
      <SwiperSlide>
        <div className="image-wrapper" style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          margin: '0 auto',
        }}>
          <h2 className="welcome-text" style={{ fontFamily: 'Lato', color: 'white', marginTop: '75px', textAlign: 'center', fontSize: '26px' }}>Blessings in every breath</h2>

          <img src={bappa2Img} alt="Slide 1" style={{ width: '50%', height: '60%', objectFit: 'cover', display: 'block', margin: '0 auto' }} />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <img src={bothImg} alt="Slide 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </SwiperSlide>
            
      <SwiperSlide>
        <div>
          <img src={girl2Img} alt="Slide 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperShow;
