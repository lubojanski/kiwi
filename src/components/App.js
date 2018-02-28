import React, { Component } from 'react'
import Search from './Search'
import FlightList from './FlightList'
import moment from 'moment'


class App extends Component {
  constructor(props) {
    super(props);

    const departureDate = new Date();
    const arrivalDate = new Date();
    const departureDateFormatted = moment(arrivalDate).format('YYYY-MM-DD')

    this.state = {
      autocomplete: [],
      autocompletePhrase: null,
      departure: null,
      destination: null,
      departureDate,
      departureDateFormatted
    };
  }
  handleDepartureChange = (value) => {
    this.setState({ departure: value, autocompletePhrase: value });
  }
  handleDestinationChange = (value) => {
    this.setState({ destination: value, autocompletePhrase: value });
  }
  handleDepartureDateChange = (event, date) => {
    this.setState({ departureDateFormatted: moment(date).format('YYYY-MM-DD') });
  }
  render() {
    return (
      <div>
        <Search autocomplete={this.state.autocomplete} autocompletePhrase={this.state.autocompletePhrase} departure={this.state.departure} destination={this.destination} handleDepartureChange={this.handleDepartureChange} handleDestinationChange={this.handleDestinationChange} handleDepartureDateChange={this.handleDepartureDateChange} handleArrivalDateChange={this.handleArrivalDateChange} departureDate={this.state.departureDate}/>
        <FlightList  departure={this.state.departure} destination={this.state.destination} departureDate={this.state.departureDate} departureDateFormatted={this.state.departureDateFormatted}/>
      </div>
    )
  }
}

export default App