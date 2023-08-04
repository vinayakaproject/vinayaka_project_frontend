import React from 'react';
import heroImg from '../../assets/heroImg.jpg';
import bgVideo from '../../assets/videos/bg1.mp4';
import { Flex } from '@chakra-ui/react';

const Hero = () => {
  return (
    <section className="text-white bg-black body-font">
      <div className="flex-1 h-auto bg-black justify-center items-center">
        {/* Background video */}
        <Flex justifyContent={'center'} alignItems={'center'}>
          <video
            className="top-0 left-0 w-full h-full lg:w-1/2 lg:h-1/2 md:w-1/2 md:h-1/2 object-contain z-0 justify-center items-center "
            autoPlay
            muted
            loop
          >
            <source src={bgVideo} type="video/mp4" />
            {/* You can add additional source tags for different video formats (e.g., webm, ogv) */}
            Your browser does not support the video tag.
          </video>
        </Flex>

        {/* Content */}
        <div className="relative z-10 justify-center items-center text-center pb-10">
          <h1 className="text-4xl text-white font-lumano">Welcome to</h1>
          <p className="text-6xl mt-5 text-white font-monoton">VINAYAKA WEBSITE</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
