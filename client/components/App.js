import React, { Component } from 'react';
import { render } from 'react-dom';
import SearchBar from './SearchBar'
import Watchlist from './Watchlist'



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      savedMovies: [],
    }
    this.saveFav = this.saveFav.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async saveFav (obj) {
    if (this.state.savedMovies.includes(obj.target.value)) return;
    await this.setState({savedMovies: [...this.state.savedMovies, obj.target.value]})
    let body = {username: this.state.user.username, favorites: this.state.savedMovies}
    console.log(this.state.savedMovies)

    await fetch('/save', {
      method: 'POST',
      headers: {'Content-Type': 'Application/JSON'},
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(newUser => this.setState({user: newUser}))
      .catch(err => console.log(err))

  console.log(this.state)

  }

  getUser(user){
    this.setState({ user: user})
    console.log(this.state)
  }

  render() {
    return(
      <section id='main'>
        <Watchlist getUser={this.getUser} savedMovies={this.state.savedMovies} />
        <SearchBar savFav={this.saveFav} />
      </section>
    )
  }
}


export default App;