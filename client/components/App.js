import React, { Component } from 'react';
import { render } from 'react-dom';
import SearchBar from './SearchBar'
import Watchlist from './Watchlist'



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      savedMovies: [],
    }
    this.saveFav = this.saveFav.bind(this);
  }

  async saveFav (obj) {
    if (this.state.savedMovies.includes(obj.target.value)) return;
    await this.setState({savedMovies: [...this.state.savedMovies, obj.target.value]})
    console.log(this.state.savedMovies)
  }

  render() {
    return(
      <section id='main'>
        <Watchlist />
        <SearchBar savFav={this.saveFav}/>
      </section>
    )
  }
}


export default App;