import Header from './components/Header';
import Login from './components/Login';
import SaveToLocalstorage from './components/SaveToLocalstorage';
import Carousel from './Carousel';

function App() {
  return (
    <div className='App'>
      <Header />
      <SaveToLocalstorage />
      <hr />
      <Login />
      <Carousel />
    </div>
  );
}

export default App;
