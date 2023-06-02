import React from "react";
import {MdOutlineArrowDropDown} from 'react-icons/md';
import styles from "../../styles/general/signedUserHeaderOptions.module.css";

const SignedUserHeaderOptions = ({ userName = "Ankit", id = "0" }) => {

  return (
    <div className={styles.dropdown}>
      <div className={styles.user} tabIndex="0">
        <p>{userName}</p>
        <MdOutlineArrowDropDown/>
      </div>
      <div className={styles.menu}>
        <a href={`/profile/${id}`}>Profile</a>
        <a href={`/orders/${id}`}>Orders</a>
        <a href={`/notifications/${id}`}>Notifications</a>
        <a href="/help">Help</a>
        <a href="/about">About</a>
      </div>
    </div>
  );
};

export default SignedUserHeaderOptions;
