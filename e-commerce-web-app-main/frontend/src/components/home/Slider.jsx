import React, {useEffect} from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "../../styles/home/slider.module.css";

const Slider = ({ slides }) => {
  let counter = 0;

  const handleClick = (dir) => {
    dir < 0 ? counter++ : counter--;
    if (counter === -1 * slides.length) counter = 0;
    if (counter > 0) counter = 1 - slides.length;
    const val = counter * 100;

    const allSlidesCollec = document.getElementsByClassName(styles.slide);
    const allSlidesArr = [...allSlidesCollec];
    allSlidesArr.forEach((item) => {
        item.style.transform = `translateX(${val}%)`;
    })
  };

  return (

    <div className={styles.container}>
        <div className={styles.arrowContainer}>
          <button className={styles.leftArrow} onClick={() => handleClick(-1)}><AiOutlineLeft /></button>
          <button className={styles.rightArrow} onClick={() => handleClick(1)}><AiOutlineRight /></button>
        </div>
        <div className={styles.wrapper}>
            {(slides.length > 0)
            ? slides.map((item) => (
                <div
                    key={item.id}
                    className={styles.slide}
                    >
                    
                    <img src={item.image} alt={`Slide ${item.id}`}/>
                    <div className={styles.textWrapper}>
                        <h1 className={styles.title}>{item.title}</h1>
                        <p className={styles.desc}>{item.description}</p>
                        <button className={styles.btn}>Shop Now</button>
                    </div>
                </div>
                ))
            :   <h1 className={styles.errMsg}>There will be slides... IN TIME</h1>
            }
        </div>
    </div>
  );
};

export default Slider;
