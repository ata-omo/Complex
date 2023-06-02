import React from 'react';
import styles from '../../styles/general/footer.module.css';
import {FaFacebookF, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.footerItem}>
                <h4 className={styles.title}>Company</h4>
                <ul className={styles.list}>
                    <li className={styles.link}><a href="/#">About Us</a></li>
                    <li className={styles.link}><a href="/#">Our Services</a></li>
                    <li className={styles.link}><a href="/#">Privacy Policies</a></li>
                    <li className={styles.link}><a href="/#">Contact Us</a></li>
                </ul>
            </div>

            <div className={styles.footerItem}>
                <h4 className={styles.title}>Get Help</h4>
                <ul className={styles.list}>
                    <li className={styles.link}><a href="/#">FAQ</a></li>
                    <li className={styles.link}><a href="/#">Shipping</a></li>
                    <li className={styles.link}><a href="/#">Returns</a></li>
                    <li className={styles.link}><a href="/#">Order Status</a></li>
                    <li className={styles.link}><a href="/#">Payment Options</a></li>
                </ul>
            </div>

            <div className={styles.footerItem}>
                <h4 className={styles.title}>Online Shop</h4>
                <ul className={styles.list}>
                    <li className={styles.link}><a href="/#">Mobile Phones</a></li>
                    <li className={styles.link}><a href="/#">Bag</a></li>
                    <li className={styles.link}><a href="/#">Shoes</a></li>
                    <li className={styles.link}><a href="/#">Dress</a></li>
                </ul>
            </div>

            <div className={styles.footerItem}>
                <h4 className={styles.title}>Follow Us</h4>
                <div className={styles.iconContainer}>
                    <a href="/#" ><FaFacebookF /></a>
                    <a href="/#" ><FaTwitter /></a>
                    <a href="/#" ><FaInstagram /></a>
                    <a href="/#" ><FaLinkedin /></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer