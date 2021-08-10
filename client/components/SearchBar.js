import React, { Component } from 'react';
import { render } from 'react-dom';
// import fetch from 'fetch';

const fetchTitle = async (input) => {

  return fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "5a35e21c05msh291692817a34746p16806ajsn36bd5b37492a",
      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
    }
  })
  .then(response => response.json())
  .then(obj => obj)
  .catch(err => {
    console.error(err);
  });

}


class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ results: fetchTitle() })  
    console.log(this.state)  
  }

  render() {
    return (
    <div id='searchCont'>
       <label htmlFor="site-search"></label>
        <input type='search' id='searchbar'></input>
      <button id='searchButton' onClick={this.handleClick}>Search Films</button>
    </div>
)
  }
}

export default SearchBar;