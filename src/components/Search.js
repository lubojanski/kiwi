import React, { Component } from 'react'
import {DatePicker, TextField, AutoComplete} from 'material-ui';


class Search extends Component {


  render() {
    return (
        <div className="search-bar">

            <TextField
                onChange={this.props.handleDepartureChange}
                hintText="Wroclaw"
                floatingLabelText="Departure"
            />
            <TextField
                onChange={this.props.handleDestinationChange}
                hintText="Barcelona"
                floatingLabelText="Arrival"
            />
            <div className="search-bar__datepicker">
            <DatePicker
                onChange={this.props.handleDepartureDateChange}
                floatingLabelText="Departure"
                defaultDate={this.props.departureDate}
                container="inline" 
                mode="landscape"
            />
            </div>
        </div>
    ) 
  } 
}

export default Search