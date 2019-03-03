import React from 'react';
import $ from 'jquery';

class Breweries extends React.Component {
  constructor(props) {
    super(props);
    this.getBreweries = this.getBreweries.bind(this);
    this.getBreweryInfo = this.getBreweryInfo.bind(this);
    this.getCharacter = this.getCharacter.bind(this);
    this.state = {
      breweries: null,
      name: null,
      city: null,
      state: null,
      website: null,
      character: null
    }
  }

  componentDidMount() {
    this.getBreweries();
  }

  getBreweries() {
    $.ajax({
      method: "GET",
      url: "https://api.openbrewerydb.org/breweries",
      success: (data) => {
        let randomId = Math.floor(Math.random() * (data.length-1));
        this.getBreweryInfo(randomId);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getBreweryInfo(id) {
    $.ajax({
      method: "GET",
      url: `https://api.openbrewerydb.org/breweries/${id}`,
      success: (data) => {
        let id = Math.floor(data.latitude);
        this.setState({
          name: data.name,
          city: data.city,
          state: data.state,
          website: data.website_url
        });
        this.getCharacter(id);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCharacter(id) {
    $.ajax({
      method: "GET",
      url: `https://anapioficeandfire.com/api/characters/${id}`,
      success: (data) => {
        this.setState({
          character: data.name
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <div>You Should Visit This Brewery:</div>
        <div>
          <div>Name: {this.state.name}</div>
          <div>Location: {this.state.city}, {this.state.state}</div>
          <div>
            Website: 
            <a href={this.state.website}>{this.state.website}</a>
          </div>
        </div>
        <div>Have a Beer with {this.state.character}</div>
      </div>
    )
  }
}

export default Breweries;