import React from 'react';
import { render } from 'react-dom';
import img from './assets/stars1.jpeg';
import css from './styles.css'
import App from './components/App'



// uncomment so that webpack can bundle styles

render(
  <App />,
  document.getElementById('root')
);
