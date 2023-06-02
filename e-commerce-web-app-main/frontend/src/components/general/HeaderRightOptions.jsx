import React from 'react';
import {Link} from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import UnsignedUserHeaderOptions from "./UnsignedUserHeaderOptions";
import SignedUserHeaderOptions from "./SignedUserHeaderOptions";
import styles from "../../styles/general/headerRightOptions.module.css";

const HeaderRightOptions = ({isLoggedIn = false, numCartItems = 0}) => {
  return (
    <div className={styles.right}>
        { isLoggedIn ? <SignedUserHeaderOptions /> : <UnsignedUserHeaderOptions /> }
        <a href='/orders'>Returns&Orders</a>
        <Link to='/viewcart'><FaShoppingCart /><sup >( {numCartItems} )</sup></Link>
    </div>
  )
}



export default HeaderRightOptions