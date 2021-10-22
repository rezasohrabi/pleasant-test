import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import  styles from './Home.module.scss';
import "./assets/sass/index.scss";

class Home extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <Header />
        <Main />
        <Footer />
        <button className="base-button button-primary">this is primary button</button>
        <button className="base-button button-error">this is primary button</button>
        <button className="base-button button-secondary">this is primary button</button>
      </div>
    );
  }
}

export default Home;
