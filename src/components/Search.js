import React, { Component } from 'react'

class Search extends Component {

  render() {
    return (
        <div>
            <div>Search</div>
            <input type="text" onChange= {event => this.props.handleDepartureChange(event.target.value)} />
            <input type="text"  onChange={event => this.props.handleDestinationChange(event.target.value)} />
        </div>
    ) 
  } 
}

export default Search