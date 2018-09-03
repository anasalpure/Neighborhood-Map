
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


}



export default GoogleMaps ;