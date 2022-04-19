import styles from "../Styles/Pages/Main.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SignUpForm from "../Components/Forms/SignUpForm";

export default function SignUp() {
  return (
    <div>
      <Header />
      <div className={styles.Main}>
        <SignUpForm />
      </div>
      <Footer />
    </div>
  );
}
