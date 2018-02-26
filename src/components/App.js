import React, { Component } from 'react'
import Search from './Search'
import FlightList from './FlightList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: 'warsaw',
      destination: 'wroclaw'
    };
  }
  handleDepartureChange = (value) => {
    this.setState({ departure: value });
  }
  handleDestinationChange = (value) => {
    this.setState({ destination: value });
  }
  render() {
    return (
      <div>
        <Search handleDepartureChange={this.handleDepartureChange} handleDestinationChange={this.handleDestinationChange}/>
        <FlightList departure={this.state.departure} destination={this.state.destination}/>
      </div>
    )
  }
}

export default App