import React from 'react';
import styles from '../../styles/single-product-page/singleProductPageSliderChildren.module.css';

const SliderChildren = ({slides, currentSlide, setCurrentSlide}) => {

  return (
    <div className={styles.sliderChildrenGrid} >
        {
            slides.map((item, index) => 
                <div key={item.public_id} className={styles.child} onMouseOver={() => setCurrentSlide(index)} tabIndex="0">
                    {
                        index === currentSlide
                        ? <img src={item.url} alt={item.public_id}/>
                        : <img src={item.url} style={{opacity: 0.5}} alt={item.public_id}/>
                    }
                </div>
            )
        }
    </div>
  )
}

export default SliderChildren