import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {FaCartPlus} from 'react-icons/fa';
import styles from '../../styles/general/productBar.module.css';

const ProductBar = ({products, limit, columns, heading, isTitle, handleAddToCart}) => {
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    setDisplayItems(products.slice(0, Math.min(products.length, limit)));
  }, [products, limit, columns, heading, isTitle]);

  return (
    <div className={styles.container}>
      {
        heading && <h2 className={styles.heading}>{heading}</h2>
      }
      <div className={styles.bar} style={{
        gridTemplateColumns:`repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(limit/columns)}, calc(${120}vw/${columns}))`
        }}
      >
        {
          displayItems.map((item) =>
            <div key={item.id} className={styles.item}>
              <button className={styles.addToCartBtn} onClick={() => handleAddToCart(item, 1)}><FaCartPlus /></button>
              <Link to={`/products/${item.id}`} >
                <div className={styles.imgContainer}>
                  <img src={item.src} alt={item.title} />
                </div>
                {
                  isTitle && (
                    <div className={styles.itemDetails} style={{
                      fontSize:`calc(5vw/${columns})`
                    }}>
                      <p className={styles.title}>{item.title}</p>
                      <p className={styles.price}>&#8377; {item.price}</p>
                    </div>
                  )
                }
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

ProductBar.defaultProps = {
  heading: "BEST SELLERS",
  isTitle: true,
  columns: 1
}

export default ProductBar;