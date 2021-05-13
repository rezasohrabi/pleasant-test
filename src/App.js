import Header from './components/Header';
import Login from './components/Login';
import SaveToLocalstorage from './components/SaveToLocalstorage';

function App() {
  return (
    <div className='App'>
      <Header />
      <SaveToLocalstorage />
      <hr />
      <Login />
    </div>
  );
}

export default App;
