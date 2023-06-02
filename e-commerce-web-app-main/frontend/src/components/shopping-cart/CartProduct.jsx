import React, { useEffect, useState } from "react";
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import styles from "../../styles/shopping-cart/cartProduct.module.css";

const CartProduct = ({ item, handleAddToCart }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(item.count);
  }, [item]);

  const handleCountChange = (value) => {
    if (item.inventory === 0) {
      window.alert("Stock Out");
      return;
    }
    handleAddToCart(item, value);
  };

  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <img src={item.src} alt={item.title} />
      </div>
      <div className={styles.right}>
        <div className={styles.desc}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.highlightInfo}>{item.highlightInfo}</div>
        </div>
        <div className={styles.addRemove}>
          <div className={styles.singleChange}>
            <button
              className={styles.minus}
              onClick={() => handleCountChange(-1)}
            >
                <AiOutlineMinus />
            </button>
            <label
              htmlFor={styles.countItem}
              style={{ position: "absolute", left: "-9999999px" }}
            >
              Car Value
            </label>
            <input
              type="text"
              name="currentQuantity"
              id={styles.countItem}
              className={styles.countItem}
              value={count}
              tabIndex="-1"
            />
            <button
              className={styles.plus}
              onClick={() => handleCountChange(1)}
            >
                <AiOutlinePlus />
            </button>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => handleCountChange(-count)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
