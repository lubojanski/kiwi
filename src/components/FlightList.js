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
import RaisedButton from 'material-ui/RaisedButton';

class FlightList extends Component {

  loadNextPage = () => this.props.loadMoreEntries("after", "endCursor")
  loadPreviousPage = () => this.props.loadMoreEntries("before", "startCursor")

  render() {

      if (this.props.data && this.props.data.loading) {
        
        return <div>Loading</div>
      }
      if (this.props.data && this.props.data.error) {
        
        return <div>Error</div>
      }
      
      if(this.props.data && this.props.data.allFlights){
        
        return (<div className="flights-table">
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
          <div className="flights-table__buttons">
            <RaisedButton onClick={this.loadPreviousPage} label="Previous Page"  />
            <RaisedButton onClick={this.loadNextPage}  label="Next Page"  />
          </div>
          
          </div>)
      }
      return <div></div>

  } 
}


const FEED_QUERY = gql`
query flights($departure: String, $destination: String, $departureDate: Date, $after: String, $before: String){
  allFlights(search: 
    { 
      from: {
        location: $departure
      }, 
      to: {
        location: $destination
      }, 
      date: { exact: $departureDate}
    },
    first: 5,
    after: $after,
    before: $before){
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
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
  }
}
`

export default graphql(FEED_QUERY, { 
  skip: (props) => {
    return !props.formBuffer
    //return !props.formBuffer.departure || !props.formBuffer.destination || !props.formBuffer.departureDate
  },
  options: (props) =>{ 
    return{
      variables: { 
        departure: props.formBuffer.departure , 
        destination: props.formBuffer.destination,
        departureDate: props.formBuffer.departureDateFormatted
      }
    }
  },
  props(props) {
    
    return {
      ...props,
      loadMoreEntries: (orientation, cursor) => {
        return props.data.fetchMore({
          query: FEED_QUERY,
          variables: {
            [orientation]: props.data.allFlights.pageInfo[cursor],
            ...props.data.variables
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.allFlights.edges;
            const pageInfo = fetchMoreResult.allFlights.pageInfo;

            return newEdges.length ? {
              allFlights: {
                __typename: previousResult.allFlights.__typename,
                edges: newEdges,
                pageInfo,
              },
            } : previousResult;
          },
        });
      }
    }
  }
}) (FlightList)