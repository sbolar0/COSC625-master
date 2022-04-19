import styles from '../Styles/Pages/Main.module.css'
import Chart from '../Components/CandleChart'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import LoginForm from '../Components/Forms/LoginForm'
import NewsFeed from '../Components/NewsFeed'

function Main() {
  return (
    <div>
      <Header />
      <div className={styles.Main}>
        <div className={styles.chartMainContainer}>
          <Chart />
        </div>
        <div className={styles.rightCont}>
          <div className={styles.loginContainer}>
            <LoginForm />
          </div>
          <div className={styles.newsCont}>
            <NewsFeed />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
