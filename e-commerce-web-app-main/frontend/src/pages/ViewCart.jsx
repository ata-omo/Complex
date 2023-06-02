import React, { useContext, useEffect, useState } from "react";
import { TbShieldLock } from "react-icons/tb";
import CartProduct from "../components/shopping-cart/CartProduct";
import DataContext from "../contexts/DataContext";
import styles from "../styles/shopping-cart/viewCart.module.css";

const ViewCart = () => {
  const {cartItems, handleAddToCart} = useContext(DataContext);
  
  const [totalMrp, settotalMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAmt, settotalAmt] = useState(0);
  const [totalShipCharge, setTotalShipCharge] = useState(0);

  useEffect(() => {
    const mrpSum = cartItems.reduce(
      (acc, item) => acc + item.mrp * item.count,
      0
    );
    const amtSum = cartItems.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    const shipChargeSum = cartItems.reduce(
      (acc, item) => acc + item.shipCharge,
      0
    );

    settotalMrp(mrpSum);
    settotalAmt(amtSum + shipChargeSum);
    setDiscount(mrpSum - amtSum - shipChargeSum);
    setTotalShipCharge(shipChargeSum);
  }, [cartItems]);

  return (
    <main className={styles.cartMain}>
      <div className={styles.cartHeader}>
        <h2 className={styles.title}>My Cart</h2>
        <h3 className={styles.headerTotal}>Total Amount: &#8377;{totalAmt}</h3>
      </div>
      <div className={styles.cartBody}>
        <div className={styles.left}>
          {cartItems.map((item) => (
            <CartProduct key={item.id} item={item} handleAddToCart={handleAddToCart}/>
          ))}
        </div>

        <div className={styles.right}>
          <div className={styles.priceDetails}>
            <ul>
              <li>
                <span>Bag Total</span>
                <span>&#8377;{totalMrp}</span>
              </li>
              <li>
                <span>Shipping Charge</span>
                <span>&#8377;{totalShipCharge}</span>
              </li>
              <li>
                <span>Bag Subtotal</span>
                <span>&#8377;{totalMrp}</span>
              </li>
              <li>
                <span>Product Discount(s)</span>
                <span>-&#8377;{totalMrp}</span>
              </li>
              <li style={{ color: "#417505" }}>
                You will save &#8377;{discount} on this order
              </li>
            </ul>
            <div className={styles.checkoutBar}>
              <div className={styles.totalAmt}>
                <h2>TOTAL</h2>
                <h2>&#8377;{totalAmt}</h2>
              </div>
              <a href="/checkout">
                <button className={styles.checkoutBtn}>Checkout</button>
              </a>
            </div>
          </div>
          <div className={styles.desclaimer}>
            <div className={styles.securityLogoContainer}>
              <TbShieldLock />
            </div>
            <p>
              Safe and secure payments. Easy returns. 100% Authentic products.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewCart;
