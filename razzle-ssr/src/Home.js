import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import  styles from './Home.module.scss';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default Home;
