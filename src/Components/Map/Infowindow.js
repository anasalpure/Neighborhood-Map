import React from 'react';


class Infowindow extends React.Component {
    constructor(props) {
      super(props);
      this.infoView = React.createRef();
      this.infowindow = new window.google.maps.InfoWindow({
        maxWidth : 300 
      });

    }


    toggle=()=>{
        const {marker , map} =this.props;
        if (this.infowindow.marker !== marker) {
            // Clear the infowindow content to give the streetview time to load.
            this.infowindow.setContent('');
            this.infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            this.infowindow.addListener('closeclick', ()=> {
              this.infowindow.marker = null;
            });
      
            this.infowindow.setContent(this.infoView.current);
            // Open the infowindow on the correct marker.
            this.infowindow.open(map , marker);
          }
    }
    
    render() {
        this.toggle()
        const {children , marker} =this.props;
        const style={
            display:marker?'block':'none',
        }

        return (
            <div className="info-window" ref={this.infoView} style={style} id="infoWindow" >
            {marker&& 
                <React.Fragment>         
                    <h1>{marker.title||'no name'}</h1>
                    <div >
                        {marker.title}  <br/>
                        Country : { marker.desc.Country} <br/>
                        City : { marker.desc.City}  <br/>
                        Cross Street : { marker.desc.CrossStreet}  <br/>
                    </div>
                    {children} 
                </React.Fragment> 
            } 
            </div> 
 
        );
    }
  }

  export default Infowindow;