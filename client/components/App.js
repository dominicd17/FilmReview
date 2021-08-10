import React, { Component } from 'react';
import { render } from 'react-dom';
import SearchBar from './SearchBar'



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: ''
    }
  }

  render() {
    return(
      <section id='main'>
        <SearchBar/>
      </section>
    )
  }

}

export default App;