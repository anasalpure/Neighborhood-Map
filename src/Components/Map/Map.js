import React, { Component } from 'react';
import GoogleMaps from './GoogleMaps'
import styles from './styles'

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
    
    //update the state 
    this.setState({map});

  }
 
  refreshMarkers=()=>{
    this.markers=this.googleMaps.getMarkersFromlocations(this.props.locations , this.state.map);
    // Create an onclick event to open the infowindow at each marker.
    this.markers.forEach( (marker,index)=>
      marker.addListener('mouseover', ()=> {
        this.setState({activeMarker:index})
      })
    )
  }


  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.locations !== this.props.locations)
    this.state.map && this.refreshMarkers();
  }

  render(){
    const {map , activeMarker}=this.state;
    return (
      <React.Fragment>
          <div id='map'> </div>
          {map&&
            <Infowindow  marker={this.markers[activeMarker]} map={map}  ></Infowindow>
          }
      </React.Fragment> 
    )
  }


}

export default Maps ;
  