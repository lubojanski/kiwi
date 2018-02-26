import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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

  /*  if (this.props.feedQuery && this.props.feedQuery.loading) {
        
        return <div>Loading</div>
      }
    
      // 2
      if (this.props.feedQuery && this.props.feedQuery.error) {
        return <div>Error</div>
      }
    
      // 3
      const linksToRender = this.props.feedQuery.feed.links
*/    

      if (this.props.data && this.props.data.loading) {
        console.log('loading ', this.props);
        return <div>Loading</div>
      }
      if (this.props.data && this.props.data.error) {
        return <div>Error</div>
      }
      if(this.props.data.allFlights){
        console.log('fetched ', this.props);
        
        const flights = this.props.data.allFlights.edges.map( function(edge, i){
          return <li key={i}> {edge.node.arrival.localTime} {edge.node.departure.localTime} {edge.node.price.amount} {edge.node.price.currency}</li>
        }) 
        return flights 
        
      }
      return <div> s </div>

  } 
}


// 1
const FEED_QUERY = gql`
query flights($departure: String, $destination: String){
  allFlights(search: 
    { 
      from: {
        location: $departure
      }, 
      to: {
        location: $destination
      }, 
      date: { from: "2018-03-02", to:"2018-03-03",}} ){
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
  options(props){ 
   // return () => {
      return{
        variables: { 
          departure: props.departure , 
          destination: props.destination
        }
      }
    }
  //}
}) (FlightList)