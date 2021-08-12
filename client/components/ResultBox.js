import React, { Component } from 'react';
import { Button } from '@material-ui/core';


class ResultBox extends Component {
  constructor(props){
    super();
    this.state = {
    };
  }
  render () {
    console.log(this.props.allProps)
    const ratings = [];

    this.props.ratings.forEach((obj, ind) => {

      if (obj.Source === 'Internet Movie Database'){
        ratings.push(<p className='ratings' id='imdb' key={ind}>Internet Movie Database Rating: {'  ' + obj.Value}</p>)
      }
      if (obj.Source === 'Rotten Tomatoes'){
        ratings.push(<p className='ratings' id='rt' key={ind}>Rotten Tomatoes Rating: {'  ' + obj.Value}</p>)
      }
      if (obj.Source === 'Metacritic'){
        ratings.push(<p className='ratings' id='mc' key={ind}>Metacritic Rating: {'  ' + obj.Value}</p>)
      }
      if (obj.Source === 'Gfuel'){
        ratings.push(<p className='ratings' id='gf' key={ind}>FDA Rating: {'  ' + obj.Value}</p>)
      }
    })

    return (
    <div className='results'>
      <img className='poster' src={this.props.posterUrl}></img>
      <h1 className='movieTitle'>{this.props.title}</h1>
      <h2 className='year'>{this.props.year}</h2>
      {ratings}
      {/* <p className='ratings' id='imdb'>{this.props.ratings[0].Source + " Rating "}{this.props.ratings[0].Value}</p>
      <p className='ratings' id='rt'>{this.props.ratings[1].Source + " Rating "}{this.props.ratings[1].Value}</p>
      <p className='ratings' id='mc'>{this.props.ratings[2].Source + " Rating "}{this.props.ratings[2].Value}</p> */}
      <button id='savFav' value={this.props.title} onClick={this.props.savFav}>Save</button>
    </div>
    )
  } 
}

export default ResultBox;