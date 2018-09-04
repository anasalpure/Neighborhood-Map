import React, { Component } from 'react';
import GoogleMaps from './GoogleMaps'
import styles from './styles'
import './map.css'


const key ='AIzaSyBpEWCjp0C0M4npvCPouQE0hCjfKXwYoXY';
const libraries=['places','geometry','drawing']


class Maps extends Component {
  constructor(props) {
    super(props);
    this.googleMaps=null;
    this.map =null;
    this.infowindow;
    this. markers = [];
  }

  componentDidMount(){
    this.googleMaps=new GoogleMaps({key , libraries , callback:this.initMap});
    this.googleMaps.init();
  }

  initMap=()=> {
    // Constructor creates a new map - only center and zoom are required.
     this.map = new window.google.maps.Map(document.getElementById('map'), {
       center: {lat: 25.203041406382805, lng: 55.275247754990005},
       zoom: 13,
       styles :styles
     });
     this.map.addListener('click' ,e=>console.log(e.latLng.toJSON()))
 }


  render(){
   return <div id='map'> </div>
  }


}

export default Maps ;
  