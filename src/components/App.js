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
      departureDateFormatted,
      formBuffer: null,
    };
  }
    /*     var buffer = {...this.state.formBuffer}
    buffer.departure = this.departure
    buffer.destination = this.destination,
    departureDateFormatted: this.departureDateFormatted */
  handleSubmit = (e) => {
    var buffer = {...this.state.formBuffer}
    buffer.departure = this.state.departure
    console.log('this.state.departure: ', this.state.departure);
    buffer.destination = this.state.destination
    console.log('this.state.destination: ', this.state.destination);
    buffer.departureDateFormatted = this.state.departureDateFormatted
    console.log('this.state.departureDateFormatted: ', this.state.departureDateFormatted);
    console.log('buffer: ', buffer);

    this.setState({ 
      formBuffer: buffer
    })
    e.preventDefault();
    console.log('e:ee ', this.state);
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
        <Search autocomplete={this.state.autocomplete} autocompletePhrase={this.state.autocompletePhrase} handleSubmit={this.handleSubmit} handleDepartureChange={this.handleDepartureChange} handleDestinationChange={this.handleDestinationChange} handleDepartureDateChange={this.handleDepartureDateChange} departureDate={this.state.departureDate}/>
        <FlightList  departure={this.state.departure} destination={this.state.destination} departureDate={this.state.departureDate} departureDateFormatted={this.state.departureDateFormatted} formBuffer={this.state.formBuffer}/>
      </div>
    )
  }
}

export default App