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
      styles :styles ,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
        style: window.google.maps.ZoomControlStyle.SMALL
      },
      streetViewControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      mapTypeControl: false,
    });

    map.addListener('click' ,e=>console.log(e.latLng.toJSON()))
  //  map.controls[window.google.maps.ControlPosition.LEFT_CENTER].push( '<NavMenu id="NavbarControle" > </NavMenu>' ); 
    //update the state 
    this.setState({map});

  }
 
  refreshMarkers=()=>{
    //clear previously painted markers
    this.markers.map( marker=>marker.setMap(null) )

    this.markers=this.googleMaps.getMarkersFromlocations(this.props.locations , this.state.map);
    // Create an onclick event to open the infowindow at each marker.
    this.markers.forEach( marker=>
      marker.addListener('mouseover', ()=> {
        this.props.select(marker.id)
      })
    )
  }

  getFirstMarker=(id)=>{
    for(let marker of this.markers){
      if (marker.id===id)
        return marker
    }
    return null
  }

  componentWillMount(){
    this.setState({activeMarker:this.props.activeMarker})
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.locations !== this.props.locations)
    this.state.map && this.refreshMarkers();
  }


  render(){
    
    const {map}=this.state;
    return (
      <React.Fragment>
          <div id='map'> </div>
          {map&&
            <Infowindow  marker={this.getFirstMarker(this.props.activeMarker)} map={map}  ></Infowindow>
          }
      </React.Fragment> 
    )
  }


}

export default Maps ;
  
