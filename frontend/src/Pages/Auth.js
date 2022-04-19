import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AuthForm from '../Components/Forms/AuthForm'
import styles from '../Styles/Pages/Main.module.css'

export default function Auth() {
  return (
    <div className={styles.Main}>
        <Header />
          <div style={{width:'50vw'}}>
            <div className={styles.loginContainer}>
              <AuthForm />
            </div>
          </div>
        <Footer/>
    </div>
  )
}
