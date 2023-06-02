import React from 'react';
import { useState} from 'react';
import Slide from './SingleProductPageSlide';
import SliderChildren from './SingleProductPageSliderChildren';
import SliderButtons from './SingleProductPageSliderButtons';
import styles from '../../styles/single-product-page/singleProductPageSlider.module.css';

const SingleProductPageSlider = ({slides, showButton = true, showChildren = true}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  
  return (
        <div className={styles.banner}>
            <div className={styles.slider}>
            {
                showButton && <SliderButtons slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
            }
            {
                slides.map((item) => (
                <Slide key={item.public_id} imgSrc={item.url} currentSlide={currentSlide}/>
                ))
            }          
            </div>
            <div className={styles.children}>
            {
                showChildren && <SliderChildren slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
            }
            </div>
        </div>
  );
}

SingleProductPageSlider.defaultProps = {
  slides: ["https://images.pexels.com/photos/3602258/pexels-photo-3602258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/6605991/pexels-photo-6605991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
}

export default SingleProductPageSlider;
