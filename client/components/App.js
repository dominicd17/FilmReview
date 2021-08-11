import React, { Component } from 'react';
import { render } from 'react-dom';
import SearchBar from './SearchBar'



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      savedMovies: [],
    }
    this.saveFav = this.saveFav.bind(this);
  }

  saveFav (obj) {
    this.setState({savedMovies: [...this.state.savedMovies, obj.target.value]})
    //console.log(obj.target.value)
  }

  render() {
    return(
      <section id='main'>
        <SearchBar savFav={this.saveFav}/>
      </section>
    )
  }
}

export default App;