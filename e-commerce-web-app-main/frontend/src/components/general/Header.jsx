import React from "react";
import {Link} from 'react-router-dom';
import styles from "../../styles/general/header.module.css";
import SearchForm from "./SearchForm";
import HeaderRightOptions from "./HeaderRightOptions";

const Header = ({numCartItems, isLoggedIn}) => {  

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <SearchForm />
      </div>
      <div className={styles.center}>
        <Link to="/"><p className={styles.shopLogo}>Complex</p></Link>
      </div>
      <HeaderRightOptions numCartItems={numCartItems} isLoggedIn={isLoggedIn}/>
    </header>
  );
};

export default Header;
