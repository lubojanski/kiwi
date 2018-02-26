import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class FlightList extends Component {

  /*componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.departure !== this.props.departure || nextProps.destination !== this.props.destination  ) {
      this.props.data.refetch({
        variables: { 
          departure: nextProps.departure, 
          destination: nextProps.destination
        }
      });
    }
  }*/

  render() {

      if (this.props.data && this.props.data.loading) {
        console.log('loading ', this.props);
        return <div>Loading</div>
      }
      if (this.props.data && this.props.data.error) {
        return <div>Error</div>
      }
      if(this.props.data && this.props.data.allFlights){
        console.log('fetched ', this.props);
        
        return (<div class="flights-table">
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>Departure</TableHeaderColumn>
                <TableHeaderColumn>Arrival</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.data.allFlights.edges.map( function(edge, i){
                return <TableRow  key={i}>
                  <TableRowColumn>{edge.node.departure.localTime}</TableRowColumn>
                  <TableRowColumn>{edge.node.arrival.localTime}</TableRowColumn>
                  <TableRowColumn>{edge.node.price.amount} {edge.node.price.currency}</TableRowColumn>
                </TableRow>
              })}
            </TableBody>
          </Table>
          </div>)
      }
      return <div></div>

  } 
}


// 1
const FEED_QUERY = gql`
query flights($departure: String, $destination: String, $departureDate: Date){
  allFlights(search: 
    { 
      from: {
        location: $departure
      }, 
      to: {
        location: $destination
      }, 
      date: { exact: $departureDate}
    }){
      edges{
        node{
          departure {
            time
            localTime
          }
          arrival {
            time
            localTime
          }
          price {
            amount
            currency
          }
          
        }
      }
  }
}
`
//departure(departure: $departure)
// 3
//  skip: (props) => !props.departure || !props.destination,


console.log('this.props: ', this.props);
export default graphql(FEED_QUERY, { 
  skip: (props) => !props.departure || !props.destination || !props.departureDate,
  options: (props) =>{ 
    return{
      variables: { 
        departure: props.departure , 
        destination: props.destination,
        departureDate: props.departureDateFormatted
      }
    }
  }
}) (FlightList)