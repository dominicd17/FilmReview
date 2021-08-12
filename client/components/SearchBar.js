import React, { Component } from 'react';
import { render } from 'react-dom';
import ResultBox from './ResultBox'
import { Button } from '@material-ui/core';



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
// return results.d[0].id;

return results.d

}

const dummyObj = {
  Title: 'Avengers End Game Babeey',
  Year: '2019',
  Ratings: [{Source: 'Internet Movie Database', Value: 10}, {Source: 'Metacritic', Value: 10}, {Source: 'Rotten Tomatoes', Value: 10}],
  Poster: './../assets/codesmith.png'
}

const codesmith = {
  Title: 'Codesmith - Live Action Film',
  Year: '2021',
  Ratings: [{Source: 'Internet Movie Database', Value: '2.6/10'}, {Source: 'Metacritic', Value: '23/100'}, {Source: 'Rotten Tomatoes', Value: '.008%'}],
  Poster: 'https://media.bizj.us/view/img/10197713/codesmithwillsentance*1024xx2048-1154-0-0.jpg'
}

const gfuel = {
  Title: 'This app is sponsered by Gfuel',
  Year: 'Ahad paid me 5 bucks to do this',
  Ratings: [{Source: 'Gfuel', Value: 'NOT APPROVED'},],
  Poster: 'https://static.displate.com/280x392/displate/2019-02-26/57bb421de88adb6a75f2d48e7e17fb95_2b27ba577f53616735dfd44b2dc05554.jpg'
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

    if (search == 'codesmith'){
      this.setState ({ results: [codesmith] });
      return
    }
    if (search == 'gfuel'){
      this.setState ({ results: [gfuel] });
      return
    }
    document.getElementById('searchbar').value = ''
    let searchArray = await fetchIMDB(search);
    const promiseArr = []
    await searchArray.filter(el => el.id[0] != '/').forEach((el) => {
      if (el.id[0] != '/'){
        let newObj = fetchTitle(el.id);
        if (newObj != undefined) promiseArr.push(newObj);
      }
    })
    let results = await Promise.all(promiseArr)
    let filteredResults = await results.filter((el) => el != undefined)
    //console.log(results)
    this.setState({results: filteredResults})
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