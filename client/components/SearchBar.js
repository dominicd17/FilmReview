import React, { Component } from 'react';
import { render } from 'react-dom';
import ResultBox from './ResultBox'
// import fetch from 'fetch';



//fetch title

const fetchTitle = async (input) => {

  let results = await fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${input}&r=json`, {
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
    //his.getInput = this.getInput.bind(this);
  }

  // getInput(e) {
  //   let result = document.getElementById('searchbar').value;
  //   this.setState({ searchText: result});
  //   console.log(this.state.searchText)
  // }

  async handleClick(e) {

    let search = await document.getElementById('searchbar').value;
    console.log(search)
    let searchID = await fetchIMDB(search);
    let finalResult = await fetchTitle(searchID);
    this.setState({results: [finalResult]})
    console.log(this.state);
    document.getElementById('searchbar').value = ''

  }

  render() {
    return (
      <section id='page'>
    <div id='searchCont'>
       <label htmlFor="site-search"></label>
        <input type='search' id='searchbar' ></input>
      <button id='searchButton' onClick={this.handleClick}>Search Films</button>
    </div>
    <div id='resultCont'>
      <h1>Testing</h1>
      <ResultBox title={'yeah'}/>
    </div>
    </section>
)
  }
}

export default SearchBar;