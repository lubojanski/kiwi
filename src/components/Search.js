import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import {DatePicker, AutoComplete} from 'material-ui';


class Search extends Component {

  render() {
    return (
        <div className="search-bar">
            <AutoComplete
                hintText="Wroclaw"
                floatingLabelText="Departure"
                
                dataSource={this.props.autocomplete}
                onUpdateInput={this.props.handleDepartureChange}
            />
            <AutoComplete
                hintText="Barcelona"
                floatingLabelText="Destination"
                
                dataSource={this.props.autocomplete}
                onUpdateInput={this.props.handleDestinationChange}
            />
            <div className="search-bar__datepicker">
            <DatePicker
                onChange={this.props.handleDepartureDateChange}
                floatingLabelText="Departure date"
                defaultDate={this.props.departureDate}
                container="inline" 
                mode="landscape"
            />
            </div>
        </div>
    ) 
  } 
}

const LOCATIONS_QUERY = gql`
query locations( $autocompletePhrase: String){
    allLocations(search: $autocompletePhrase){
        edges{
          node{
            city {
              locationId
              name
              slug
            }
          }
        }
    }
}
`

export default graphql(LOCATIONS_QUERY, { 
    skip: (props) => {
        return !props.autocompletePhrase},
    options: (props) =>{ 
      return{
        variables: { 
          autocompletePhrase: props.autocompletePhrase, 
        }
      }
    },
    props({ data: { allLocations }}) {
        let autocomplete = []
        if(allLocations){
          autocomplete = allLocations.edges
           .map( edge => edge = edge.node.city ? edge.node.city.name.toLowerCase() : null)
           .filter((city, pos, arr) => arr.indexOf(city) === pos && city)
        } 
      return {
        autocomplete,  
      }
    }
  }) (Search)