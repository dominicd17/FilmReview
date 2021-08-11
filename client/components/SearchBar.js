import React, { Component } from 'react';
import { render } from 'react-dom';
import ResultBox from './ResultBox'
import { Button } from '@material-ui/core';
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

console.log(results);
return results.d[0].id;

}

const dummyObj = {
  Title: 'Avengers End Game Babeey',
  Year: '2019',
  Ratings: [{Source: 'IMDB', Value: 10}, {Source: 'METACRITIC', Value: 10}, {Source: 'ROTTEN TOMATOES', Value: 10}],
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'
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


  async handleClick(e) {

    await this.setState({ results: []});
    let search = await document.getElementById('searchbar').value;
    document.getElementById('searchbar').value = ''
    let searchID = await fetchIMDB(search);
    console.log(searchID)
    if (searchID[0] === '/') return document.getElementById('searchbar').value = 'Could not find title';
    else{
    let finalResult = await fetchTitle(searchID);
    this.setState({results: [finalResult]})
    console.log(this.state);
    }
  }

  render() {

    const resultsRender = [];

    if (this.state.results.length) {
      this.state.results.forEach((obj, ind) => {
        resultsRender.push(<ResultBox
        

          savFav={this.props.savFav}
          key={`${ind} ${obj.Title}`}
          title={obj.Title}
          year={obj.Year}
          ratings={obj.Ratings}
          posterUrl={obj.Poster}
          allProps={obj}
          />)
      })
    }




    return (
      <section id='page'>
    <div id='searchCont'>
       <label htmlFor="site-search"></label>
        <input type='search' id='searchbar' ></input>
      <Button variant='contained' color='primary' id='searchButton' onClick={this.handleClick}>Search Films</Button>
    </div>
    <div id='resultCont'>
      {resultsRender}
    </div>
    </section>
)
  }
}

export default SearchBar;