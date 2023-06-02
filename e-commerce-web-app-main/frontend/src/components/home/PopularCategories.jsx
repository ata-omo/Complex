import React, { useEffect, useState } from "react";
import styles from "../../styles/home/popularCategories.module.css";

const PopularCategories = ({popCategories}) => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    let arr = [];

    for (let item of popCategories) {
      if (arr.length === 5) {
        break;
      }
      if (item.popular) {
        arr.push(
          <div className={styles.display}>
            <img src={item.img} alt={item.title}/>
              <a href={`/category/${item.title}`}>
                <button className={styles.categoryBtn}>{item.title}</button>
              </a>
          </div>
        );
      }
    }

    setPopular(arr);
  }, [popCategories]);

  return (
    <div className={styles.outerContainer}>
      <h2 className={styles.heading}>Popular Categories</h2>
      <div className={styles.innerContainer}>
        <div className={styles.left}>
          <div className={styles.innerBig}>{popular[1]}</div>
          <div className={styles.innerSmall}>{popular[2]}</div>
        </div>

        <div className={styles.center}>{popular[0]}</div>

        <div className={styles.right}>
          <div className={styles.innerSmall}>{popular[3]}</div>
          <div className={styles.innerBig}>{popular[4]}</div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
