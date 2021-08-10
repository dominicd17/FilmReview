import React, { Component } from 'react';


class ResultBox extends Component {
  constructor(props){
    super();
    this.state = {
    };
  }
  render () {
    return (
    <div className='results'>
      <h1>{this.props.title}</h1>
    </div>
    )
  } 
}

export default ResultBox;