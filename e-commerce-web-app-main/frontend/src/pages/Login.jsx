import React from 'react';
import {useEffect} from 'react';
import styles from '../styles/login/login.module.css';
import vector from '../data/loginVector.png';
import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';
import ForgotPassword from '../components/login/ForgotPassword';

const Login = () => {

    useEffect(() => {
        window.history.replaceState(null, "newState", `/login/signin`);
    }, [])

    const handleLoginPageSlide = (slideNumber, nextAddressState) => {
        const allSlide = [...document.getElementsByClassName(styles.slide)];
        allSlide.forEach(element => {
            element.style.transform = `translateX(-${slideNumber*100}%)`;
        });

        window.history.replaceState(null, "newState", `/login/${nextAddressState}`);

    }
  return (
    <main className={styles.mainContainer}>
        <div className={styles.innerContainer}>
            <div className={styles.imgArea}>
                <img src={vector} alt="Login vector" className={styles.vector}/>
            </div>
            <div className={styles.loginArea}>
                <div className={styles.slider}>
                    <div className={styles.slide}>
                        <ForgotPassword handleLoginPageSlide={handleLoginPageSlide}/>
                    </div>
                    <div className={styles.slide}>
                        <SignIn handleLoginPageSlide={handleLoginPageSlide}/>
                    </div>
                    <div className={styles.slide}>
                        <SignUp handleLoginPageSlide={handleLoginPageSlide}/>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Login