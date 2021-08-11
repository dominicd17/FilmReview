import React, { Component } from 'react';


class ResultBox extends Component {
  constructor(props){
    super();
    this.state = {
    };
  }
  render () {
    console.log(this.props.allProps)
    return (
    <div className='results'>
      <img className='poster' src={this.props.posterUrl}></img>
      <h1 className='movieTitle'>{this.props.title}</h1>
      <p className='ratings'>{this.props.ratings[0].Source + " Rating "}{this.props.ratings[0].Value}</p>
      <p className='ratings'>{this.props.ratings[1].Source + " Rating "}{this.props.ratings[1].Value}</p>
      <p className='ratings'>{this.props.ratings[2].Source + " Rating "}{this.props.ratings[2].Value}</p>
      <button id='savFav' value={this.props.title} onClick={this.props.savFav}>Save Favorite</button>
    </div>
    )
  } 
}

export default ResultBox;