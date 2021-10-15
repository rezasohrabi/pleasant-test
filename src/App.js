import Header from './components/Header';
import Login from './components/Login';
import SaveToLocalstorage from './components/SaveToLocalstorage';
import Carousel from './Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.scss';
import { Dropdown, Dropdown2 } from './components/Dropdown';

function App() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };
  return (
    <div className='App'>
      <Header />
      <SaveToLocalstorage />
      <hr />
      <Login />
      <Carousel />
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
      <Dropdown>
        <ul>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
        </ul>
      </Dropdown>
      <Dropdown2
        toggler={
          <div>
            <div>this is title</div>
            <div>this is desc</div>
          </div>
        }
      >
        <div>
          Don’t get discouraged when you read this section’s title and think:
          “This is easy.” I know it’s “easy” — on its face. The lesson here is
          adding a property to the child element(s) using React.cloneElement().
          To show you how this works, we’ll revisit the first example in this
          article, about repeated characters. You will not be repeating any
          characters, though — instead, you’ll define a custom CSS style that is
          added to the child using the React.cloneElement() function.
        </div>
      </Dropdown2>
      <div>
        Don’t get discouraged when you read this section’s title and think:
        “This is easy.” I know it’s “easy” — on its face. The lesson here is
        adding a property to the child element(s) using React.cloneElement(). To
        show you how this works, we’ll revisit the first example in this
        article, about repeated characters. You will not be repeating any
        characters, though — instead, you’ll define a custom CSS style that is
        added to the child using the React.cloneElement() function.
      </div>
      <Dropdown2
        toggler={
          <div>
            <div>this is title</div>
            <div>this is desc</div>
          </div>
        }
      >
        <ul>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
          <li>this is an item</li>
        </ul>
      </Dropdown2>
      <div>
        Don’t get discouraged when you read this section’s title and think:
        “This is easy.” I know it’s “easy” — on its face. The lesson here is
        adding a property to the child element(s) using React.cloneElement(). To
        show you how this works, we’ll revisit the first example in this
        article, about repeated characters. You will not be repeating any
        characters, though — instead, you’ll define a custom CSS style that is
        added to the child using the React.cloneElement() function.
      </div>
    </div>
  );
}

export default App;
