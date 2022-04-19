import React from 'react'
import styles from '../Styles/Pages/Main.module.css'
import Chart from '../Components/CandleChart'
import Header from '../Components/Header'
import Footer from '../Components/Footer'


export default function Home() {
  return (
    <div className={styles.Main}>
      <Header />
      <div style={{width:"80%",height:"80%"}}>
      <Chart/>
      </div>
      <Footer/>
    </div>
  )
}
