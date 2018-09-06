import React from 'react'
import './App.css'
import NavMenu from './Components/Navbar/NavMenu'
import Map from './Components/Map/Map'


var foursquare = require('react-foursquare')({
  clientID: 'LDIJ2T11WUFNN24PQRUDLYE0SOK0FRNZDKM2P4R2AUGKSOLG',
  clientSecret: 'KUPBSD2BMYBPJJMVWTNIU50QO4QLZ4ZGDYBZNQS1T5UWM1DI'  
});

var params = {
  "ll": "25.209848534609787,55.28805454936139",
  "query": 'Hotel'
};


class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }

  componentDidMount() {    
    foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ locations: res.response.venues });
        console.log(res.response.venues )
      });

  }

  search =({target})=>{
    params["query"] = target.value;
    foursquare.venues.getVenues(params)
    .then(res=> {
      this.setState({ locations: res.response.venues });
      console.log(res.response.venues )
    });
  }

  render() {
  
    return (
      <div className="app">
            <NavMenu locations={this.state.locations} search={this.search}/>
            <Map locations={this.state.locations} />
      </div>
    )
  }
}

export default BooksApp
