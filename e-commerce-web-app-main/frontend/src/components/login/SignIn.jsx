import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/login/signIn.module.css";

const SignIn = ({handleLoginPageSlide}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const user = await axios.post("http://localhost:3000/api/v1/login", {
      email, password
    });

    // console.log(user);
    navigate('/');
  }

  return (
    <>
    <section className={styles.logo}><h2>COMPLEX</h2></section>
    <section className={styles.content}>
        <section className={styles.welcomeMsg}>Welcome to Complex</section>
        <form action="submit" className={styles.loginForm} onSubmit={handleSubmit}>
            <label htmlFor="loginPageSignInId">Email</label>
            <input type="email" name="id" id="loginPageSignInId" className={styles.loginId} required value={email} onChange={(e) => setEmail
            (e.target.value)}/>

            <label htmlFor="loginPageSignInPassword">Password</label>
            <input type="password" name="password" id="loginPageSignInPassword" className={styles.password} required value={password} onChange={(e) => setPassword(e.target.value)}/>

            <div className={styles.forgotPassword}><span className={styles.link} onClick={() => {handleLoginPageSlide(0, "forgot-password")}}>Forgot password?</span></div>

            <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>
        <div className={styles.createAcc}>
            New to Complex? <span className={styles.link} onClick={() => handleLoginPageSlide(2, "register")}>Create Account</span>
        </div>
    </ section>
    </>
  )
}

export default SignIn