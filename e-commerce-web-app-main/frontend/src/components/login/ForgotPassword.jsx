import React from 'react';
import styles from "../../styles/login/forgotPassword.module.css";

/*
    otp verification and reset password page remaining
*/

const ForgotPassword = ({handleLoginPageSlide}) => {

  return (
    <>
    <section className={styles.logo}><h2>COMPLEX</h2></section>
    <section className={styles.content}>
        <section className={styles.welcomeMsg}>Enter registered mail id to send OTP</section>
        <form action="submit" className={styles.loginForm}>
            <label htmlFor="loginPageForgotPasswordId">Email</label>
            <input type="email" name="id" id="loginPageForgotPasswordId" className={styles.loginId} required/>

            <label htmlFor="loginPageForgotPasswordOTP">Enter OTP</label>
            <input type="number" name="otp" id="loginPageForgotPasswordOTP" min={100000} max={999999} className={styles.password} required/>

            <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
        <div className={styles.createAcc}>
            <span className={styles.link} onClick={() => handleLoginPageSlide(1, "signin")}>Go Back</span>
        </div>
    </ section>
    </>
  )
}

export default ForgotPassword;