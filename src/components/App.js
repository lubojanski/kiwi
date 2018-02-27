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
      departure: null,
      destination: null,
      departureDate,
      departureDateFormatted
    };
    console.log('state: ', this.state);
  }
  handleDepartureChange = (event, value) => {
    this.setState({ departure: value });
  }
  handleDestinationChange = (event, value) => {
    this.setState({ destination: value });
  }
  handleDepartureDateChange = (event, date) => {
    console.log('date: ', date);
    console.log('event: ', event);
    this.setState({ departureDateFormatted: moment(date).format('YYYY-MM-DD') });
  }
  render() {
    return (
      <div>
        <Search handleDepartureChange={this.handleDepartureChange} handleDestinationChange={this.handleDestinationChange} handleDepartureDateChange={this.handleDepartureDateChange} handleArrivalDateChange={this.handleArrivalDateChange} departureDate={this.state.departureDate}/>
        <FlightList departure={this.state.departure} destination={this.state.destination} departureDate={this.state.departureDate} departureDateFormatted={this.state.departureDateFormatted}/>
      </div>
    )
  }
}

export default App