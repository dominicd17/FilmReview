import React, { Component } from 'react';
import { render } from 'react-dom';
// import fetch from 'fetch';



//fetch title

const fetchTitle = async (input) => {

  let results = await fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "5a35e21c05msh291692817a34746p16806ajsn36bd5b37492a",
      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
    }
  })
  .then(response => response.json())
  .catch(err => {
    console.error(err);
  });

  //console.log(results)
  return results;

}

const fetchIMDB = async (title) => {

  let results = await fetch("https://imdb8.p.rapidapi.com/auto-complete?q=" + `${title}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "5a35e21c05msh291692817a34746p16806ajsn36bd5b37492a",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
})
.then(response => response.json())
.catch(err => {
	console.error(err);
});

//console.log(results);
return results.d[0].id;

}



class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      results: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getInput(e) {

  }

  async handleClick(e) {
    console.log(e)
    //let newResult = await fetchTitle();
    //this.setState({results: [newResult]})
    //fetchIMDB('Avengers');
    //console.log(this.state)
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