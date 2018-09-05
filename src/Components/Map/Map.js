import React, { Component } from 'react';
import GoogleMaps from './GoogleMaps'
import styles from './styles'
import locations from './locations'
import './map.css'
import Infowindow from './Infowindow'

const key ='AIzaSyBpEWCjp0C0M4npvCPouQE0hCjfKXwYoXY';
const libraries=['places','geometry','drawing']


class Maps extends Component {
  constructor(props) {
    super(props);
    this.state={
      map :null,
      activeMarker:-1
    }
    this.googleMaps=null;
    this.markers = [];
  }

  componentDidMount(){
    this.googleMaps=new GoogleMaps({key , libraries , callback:this.initMap});
    this.googleMaps.init();
  }

  initMap=()=> {
    // Constructor creates a new map - only center and zoom are required.
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 25.203041406382805, lng: 55.275247754990005},
      zoom: 13,
      styles :styles
    });

    map.addListener('click' ,e=>console.log(e.latLng.toJSON()))
    
    this.markers=this.googleMaps.getMarkersFromlocations(locations , map)

    // Create an onclick event to open the infowindow at each marker.
    this.markers.forEach( (marker,index)=>
      marker.addListener('mouseover', ()=> {
        this.setState({activeMarker:index})
      })
    )
    //update the state 
    this.setState({map});

 }




  render(){
    const {map , activeMarker}=this.state;
   return (
    <React.Fragment>
        <div id='map'> </div>
        {this.state.map&&
          <Infowindow  marker={this.markers[activeMarker]} map={map}  ></Infowindow>
        }
    </React.Fragment> 


   )
  }


}

export default Maps ;
  