import React from 'react';
import styles from "../../styles/login/signUp.module.css";

const SignUp = ({handleLoginPageSlide}) => {
  return (
    <>
    <section className={styles.logo}><h2>COMPLEX</h2></section>
    <section className={styles.content}>
        <section className={styles.welcomeMsg}>Welcome to Complex</section>
        <form action="submit" className={styles.signUpForm}>
            <div className={styles.name}>
                <div className={styles.firstnameContainer}>
                    <label htmlFor="loginPagesignUpFirstname">First Name</label>
                    <input type="text" name={styles.firstname} id="loginPageSignUpFirstname" required/>
                </div>
                <div className={styles.lastnameContainer}>
                    <label htmlFor="loginPageSignUpLastname">Last Name</label>
                    <input type="text" name={styles.lastname} id="loginPageSignUpLastname" required/>
                </div>
            </div>

            <label htmlFor="loginPageSignUpId">Email</label>
            <input type="email" name="id" id="loginPageSignUpId" className={styles.loginId} required/>

            <label htmlFor="loginPageSignUpPassword">Password</label>
            <input type="password" name="password" id="loginPageSignUpPassword" className={styles.password} required/>

            <label htmlFor="loginPageSignUpConfirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" id="loginPageSignUpConfirmPassword" className={styles.password} required/>

            <button type="submit" className={styles.submitBtn}>Sign Up</button>
        </form>
        <div className={styles.createAcc}>
            Already have an account? <span className={styles.link} onClick={() => handleLoginPageSlide(1, "signin")}>Sign In</span>
        </div>
    </section>
    </>
  )
}

export default SignUp;