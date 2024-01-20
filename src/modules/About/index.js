import React from 'react';
import naveenSheelvantImage from '../../assets/naveen-sheelvant.jpg';
import doddappashankarheralagiImage from '../../assets/doddappa-shankar-heralagi.jpg';
import kirtirajshankarheralagiImage from '../../assets/kirtiraj-shankar-heralagi.jpg';
import ratnashankarheralagiImage from '../../assets/ratna-shankar-heralagi.jpg';
import shankardoddappaheralagiImage from '../../assets/shankar-doddappa-heralagi.jpg';
import awardImage from '../../assets/award.jpg';
import ganeshaImage from '../../assets/ganesha.jpg';

const About = () => {
  const containerStyle = {
    backgroundColor: '#333',
    padding: '80px 50px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${ganeshaImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const galleryContainerStyle = {
    display: 'flex',
    marginTop: '20px',
    marginBottom: '20px',
    padding: '10px',
    gap: '20px',
    width: '100%',
  };

  const galleryImageStyle = {
    width: '250px',
    height: 'auto',
    borderRadius: '10%',
    backgroundColor: '#0095d6',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    margin: 'auto', // Center-align the image
  };

  const sectionStyle = {
    marginBottom: '20px',
    width: '70%',
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(1, 0, 10, 0.1)',
    color: 'white',
    fontFamily: 'Arial, sans-serif', // Font style added
  };

  const sectionStyle2 = {
    marginBottom: '20px',
    width: '70%',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(1, 0, 10, 0.4)',
    color: 'white',
    textAlign: 'center', // Center-align text
  };

  const headingStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bold', // Added fontWeight for bold text
    color: '#0095d6',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
  };
  
  const headingStyle1 = {
    fontSize: '1.1rem',
    fontWeight: 'bold', // Added fontWeight for bold text
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
  };
  

  const textStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold', // Added fontWeight for bold text
  };
  
  const textStyle1 = {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    fontStyle: 'italic',
    fontWeight: 'bold', // Added fontWeight for bold text
    fontFamily: 'Roboto, sans-serif',
  };
  

  const imageStyle = {
    width: '200px',
    height: 'auto',
    borderRadius: '10%',
    margin: '20px 0',
  };
  
  return (
    <div style={containerStyle}>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Refreshing Heart, Mind and Soul</h2>
        <p style={textStyle}>
          We continue to build the world’s best perfumed incense sticks and dhoops through constant Research and Development. Our aim is to deliver unparalleled innovation, the best resources available, and industry-leading productivity within a vibrant and diverse culture.
        </p>
        <p style={textStyle}>
          Vinayaka has its own creative research team who look after building fragrances which charm the Heart, Mind and Soul and an approach that harnesses our strengths to find the newest, most innovative and valuable fragrance to make our customers delighted.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Awards</h2>
        <p style={textStyle}>
          Vinayaka Perfumery is one of the leading manufacturers and exporters of Incense Sticks across the world. Vinayaka Perfumery enjoys a good reputation because of its excellent quality and wide variety. We have been providing high-quality Incense products to our customers. Vinayaka incense is the first choice of consumers. We have achieved a distinction of being one the safest incense producers.
        </p>
        <p style={textStyle}>
          Vinayaka has been awarded top exporters awards by ‘Export Promotion Council for Handicraft’ for export of Incense stick for the past three consecutive years 2008-09, 2009-10, and 2010-11.
        </p>
        <br></br>
        <img src={awardImage} alt="Award" style={imageStyle} />
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Quality</h2>
        <p style={textStyle}>
          We at Vinayaka believe in quality in every aspect of our business. Quality is a pervasive value at Vinayaka and part of our culture. The product passes through a stringent test at every junction of the process before being delivered to customers.
        </p>
        <p style={textStyle}>
          We have the scale, portfolio, talent, and capabilities that we believe will unlock new levels of horizons.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Innovations at Vinayaka</h2>
        <p style={textStyle}>
          Innovation speaks the success story of Vinayaka. Our full-fledged team is headed by highly innovative and Mastermind brains that are developing new types of incense as well as are experimenting with Product improvements.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Fragrances</h2>
        <p style={textStyle}>
        In the fragrance development lab, experimentation is always on. Best and world-class facilities are available to create and nurture the perfumed incense for our consumers. Today Vinayaka has more than 140 fragrances in its range. And this is a major source of its competitive advantage.
        </p>
        
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Packaging</h2>
        <p style={textStyle}>
        We have an in-house design studio, who work rigorously to create new graphics for our packs. Vinayaka is able to offer a wide variety of packaging with best-suited graphics for the incense it carries.
        </p>
        
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Infrastructure</h2>
        <p style={textStyle}>
        “We take pride in our Infrastructure which includes our People and our State of Art Facilities.”
        </p>
        
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Our People</h2>
        <p style={textStyle}>
        Our blend of youth and experience gives us an edge in terms of consistency as well as innovative design thinking. We are a team of 150 people striving towards creating pure aesthetic Incense.
        </p>
        
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Our Facilities</h2>
        <p style={textStyle}>
        We have two factories fully equipped with laboratories catering to global demands of incenses, state-of-the-art manufacturing units promising the best quality of incense sticks at optimum cost and with least wastage. We ensure product-specific and country-specific packaging facility, best Quality Control and Quality Assurance units to provide flawless and supreme-quality products. 
        </p>
        
      </section>

      <section style={galleryContainerStyle}>
        <div style={sectionStyle2}>
          <h2 style={headingStyle1}>SRI SHANKAR DODDAPPA HERALAGI</h2>
          <img src={shankardoddappaheralagiImage} alt="Founder" style={galleryImageStyle} />
          <p style={textStyle1}>Founder and Visionary</p>
        </div>

        <div style={sectionStyle2}>
          <h2 style={headingStyle1}>SRIMATI RATNA SHANKAR HERALAGI</h2>
          <img src={ratnashankarheralagiImage} alt="Founder" style={galleryImageStyle} />
          <p style={textStyle1}>Founder and Visionary</p>
        </div>

        <div style={sectionStyle2}>
          <h2 style={headingStyle1}>DODDAPPA SHANKAR HERALAGI</h2>
          <img src={doddappashankarheralagiImage} alt="Founder" style={galleryImageStyle} />
          <p style={textStyle1}>Team Vinayaka</p>
        </div>

        <div style={sectionStyle2}>
          <h2 style={headingStyle1}>KIRTIRAJ SHANKAR HERALAGI</h2>
          <img src={kirtirajshankarheralagiImage} alt="Team Member" style={galleryImageStyle} />
          <p style={textStyle1}>Team Vinayaka</p>
        </div>

        <div style={sectionStyle2}>
          <h2 style={headingStyle1}>MAJ. NAVEEN SHEELVANTI</h2>
          <br></br>
          <img src={naveenSheelvantImage} alt="Team Member" style={galleryImageStyle} />
          <p style={textStyle1}>Team Vinayaka</p>
        </div>
      </section>
    </div>
  );
};

export default About;