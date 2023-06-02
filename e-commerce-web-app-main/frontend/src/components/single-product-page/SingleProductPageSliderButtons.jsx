import React from 'react';
import styles from '../../styles/single-product-page/singleProductPageSliderButtons.module.css';

const SliderButtons = ({slides, currentSlide, setCurrentSlide}) => {
  return (
    <div className={styles.btns}>
    {
        slides.map((item, index) => (
            <div key={index} style={(currentSlide === index) ? {backgroundColor: "white"} : null } tabIndex="0" onClick={() => setCurrentSlide(index)}></div>
        ))
    }
    </div>
  )
}

export default SliderButtons