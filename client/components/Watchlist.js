import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Watchlist extends Component {
  constructor(props){
    super();
    this.state = {
      username: '',
      loggedIn: false,
      createUser: false,
      user: undefined,
    }
    this.createUserSwitch = this.createUserSwitch.bind(this);
    this.createUser = this.createUser.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.deleteFavs = this.deleteFavs.bind(this);
  }

  createUserSwitch (e) {
    document.getElementById('mainHeader').innerText = 'Create User';
    this.setState({createUser: true})
  }

  async createUser (e) {

    //console.log(document.getElementById('createUsername').value)
    let username = await document.getElementById('createUsername').value;
    let password = await document.getElementById('createPassword').value;
    let body = {username: username, password: password };
    
    await fetch('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/JSON'
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ user: data, createUser: false, loggedIn: true });
            //console.log(this.state)
          })
          .catch(err => console.log('error in create user fetch post'))

     document.getElementById('mainHeader').innerText = 'Film Review Database';
  }

  async userLogin (e) {

    let username = await document.getElementById('usernameLogin').value;
    let password = await document.getElementById('passwordLogin').value;
    let body = {username: username, password: password };
    //console.log(body)

    await fetch('/user/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          if (data.err) {
            alert('Username & Password do not match');
            document.getElementById('usernameLogin').value = '';
            document.getElementById('passwordLogin').value = '';
          }
          else{
          this.setState({ user: data, createUser: false, loggedIn: true });
          //console.log(this.state)
          }
        })
        .catch(err => console.log(err))
        this.props.getUser(this.state.user)
  }

  onFavoritesClick(e) {
    document.getElementById('searchbar').value = e.target.innerText;
    document.getElementById('searchButton').click();
  }

  async deleteFavs(e) {
    e.preventDefault();
    // console.log('right Clicked');
    // console.log(e.target.innerText);
    // console.log(this.props.savedMovies);
    const newFavorites = await this.props.savedMovies.filter((el) => el != e.target.innerText);
    const body = { username: this.state.user.username, favorites: newFavorites };

    await fetch('/user/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(newUser => {

        this.props.getUser(newUser)
        this.setState ({ user: newUser })
        
      })
      .catch(err => console.log(err))
    
    
     
  }


  render() {

    const favorites = [];

    if (this.state.loggedIn && this.props.savedMovies.length){
      this.props.savedMovies.forEach((str) => {
        favorites.push(<li className='favoriteList' onContextMenu={this.deleteFavs} key={str} onClick={this.onFavoritesClick}>{str + ' '}</li>)
      })
    }


    if (!this.state.loggedIn && !this.state.createUser){
      return (
        <div id ='login'>
          <input className='loginInput' id='usernameLogin' type="text" placeholder="Enter Username" name="uname" required />
          <input className='loginInput' id='passwordLogin' type="password" placeholder="Enter Password" name="psw" required />
          <Button id='loginButton' type="submit" variant='contained' color='primary' onClick={this.userLogin}>Login</Button>
          <div id='createUserButton'>
          <Button id='createButton' type="submit" variant='contained' color='primary' onClick={this.createUserSwitch}>Create User</Button>
          </div>
        </div>
      )
    }
    if (!this.state.loggedIn) {
      return (
        <div id ='createUser'>
          <input className='loginInput' id='createUsername' type="text" placeholder="Enter Desired Username" name="unamecreate" required />
          <input className='loginInput' id='createPassword' type="password" placeholder="Enter Password" name="pswcreate" required />
          <Button id='createButton' type="submit" variant='contained' color='primary' onClick={this.createUser}>Create User</Button>
        </div>
      )
    }
    if (this.state.loggedIn) {
      return (
        <div id='userField'>
          <p className='userInfo'>Welcome {' ' + this.state.user.username + '!'}</p>
          <p className='userInfo'>Your Watchlist:</p>
          <ul className ='favsList'>
          {favorites}
          </ul>
        </div>
      )
    }

  }
}

export default Watchlist;