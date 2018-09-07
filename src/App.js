import React from 'react'
import './App.css'
import NavMenu from './Components/Navbar/NavMenu'
import Map from './Components/Map/Map'

const cities=[
  {
    name :'Dubai' ,
    location :{lat:25.209848534609787 , lng:55.28805454936139}
  },
  {
    name :'Latakia' ,
    location :{lat: 35.52384198520526, lng: 35.78019747658607}
  },
  {
    name :'London' ,
    location :{lat: 51.510704817195474, lng: -0.1312192546646429}
  },
  {
    name :'Paris' ,
    location :{lat: 48.85310353236399, lng: 2.350503972522347}
  },
  {
    name :'Hamburg' ,
    location :{lat: 53.54955994963835, lng: 9.99498767968771}
  },
  {
    name :'Madrid' ,
    location :{lat: 40.407065492927686, lng: -3.670767810960342}
  },
  {
    name :'Stockholm' ,
    location :{lat: 59.34138555316195, lng: 18.054472667308573}
  },
]

var foursquare = require('react-foursquare')({
  clientID: 'LDIJ2T11WUFNN24PQRUDLYE0SOK0FRNZDKM2P4R2AUGKSOLG',
  clientSecret: 'KUPBSD2BMYBPJJMVWTNIU50QO4QLZ4ZGDYBZNQS1T5UWM1DI'  
});

var params = {
  "ll": "25.209848534609787,55.28805454936139",
  "query": "Hotel"
};


class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [] ,
      activeMarker :''
    };
  }

  componentDidMount() {    
    foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ locations: res.response.venues });
      });

  }

  setCity=({target})=>{
   const location= cities[target.value||0].location;
   params["ll"]=location.lat+','+location.lng
  }

  search =(value)=>{
    params["query"] = value;
    foursquare.venues.getVenues(params)
    .then(res=> {
      this.setState({ locations: res.response.venues });
      console.log(res.response.venues )
    });
  }

  select=(id= '')=>{
    this.setState({ activeMarker: id });
  }

  render() {
  
    return (
      <div className="app">
            <NavMenu locations={this.state.locations} cities={cities} search={this.search} select={this.select} setCity={this.setCity} />
            <Map locations={this.state.locations} select={this.select} activeMarker={this.state.activeMarker} />
      </div>
    )
  }
}

export default BooksApp
