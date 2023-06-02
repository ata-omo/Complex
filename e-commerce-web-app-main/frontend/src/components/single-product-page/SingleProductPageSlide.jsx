import React, { useEffect } from 'react';
import styles from '../../styles/single-product-page/singleProductPageSlide.module.css';

const Slide = ({name, imgSrc, currentSlide}) => {

  useEffect(() => {
    const temp = [...document.getElementsByClassName(styles.slide)];
    
    temp.forEach((item) => {
      item.style.transform = `translateX(-${currentSlide*100}%)`;
    })
  }, [currentSlide]);

  return (
    <div className={styles.slide}>
        <img src={imgSrc} alt={name}/>
    </div>
  )
}

export default Slide;