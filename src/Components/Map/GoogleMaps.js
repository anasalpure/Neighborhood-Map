
class GoogleMaps{
    
    constructor(options={}){

        if (!options.key) {
            throw new Error('You need to pass key string to maps object constructor');
        }
        if(!options.callback){
            throw new Error('You need to pass callback function to maps object constructor');
        }
        if(!options.libraries)options.libraries=[];

        this.libraries=options.libraries.join(',');
        this.key=options.key;

        window.initMap= options.callback;

        this.loaded=false ;
    }

    init() {
        if (this.loaded) {
            return 
        }

        const fjs = document.getElementsByTagName('script')[0];
        if (!fjs) {
            console.warn('Script tag does not exists in the DOM');
            return;
        }

        if (document.getElementById('google-js-api')) {
            return;
        }

        const js = document.createElement('script');
        js.id = 'google-js-api';
        js.async = true;
        js.defer = true;
        js.src = `https://maps.googleapis.com/maps/api/js?libraries=${this.libraries}&key=${this.key}&v=3.34&callback=initMap`;

        fjs.parentNode.insertBefore(js, fjs);

        this.loaded=true;
    }

    
    getMarkersFromlocations(locations,map){
        var markers=[];
        // Style the markers a bit. This will be our listing marker icon.
        var defaultIcon = this.makeMarkerIcon('defaultIcon');

        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = this.makeMarkerIcon('highlightedIcon');

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Shapes define the clickable region of the icon. The type defines an HTML
          var shape = {
            coords: [0, 0, 0, 90, 80, 20, 18, 1],
            type: 'poly'
          };
          // Create a marker per location, and put into markers array.
          var marker = new window.google.maps.Marker({
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP, //or BOUNCE
            icon: defaultIcon,
            id: i,
            map : map,
            shape :shape
          });
          // Push the marker to our array of markers.
          markers.push(marker);

          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
            this.setAnimation(window.google.maps.Animation.BOUNCE);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
            this.setAnimation(null);
          });


        }
        return markers;
    }

    makeMarkerIcon(markername) {
        var url =`/assets/${markername==='highlightedIcon'?'highlightedIcon':'defaultIcon'}.png`;
        var image = {
            url,
            size: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(40, 40)
        };
        return image;
    }

}



export default GoogleMaps ;