import React, {PropTypes, Component} from 'react';
import Place from '../components/Place'

import GoogleMap from 'google-map-react';


export default class VehicleGoogleMap extends Component {

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    //
    //shouldComponentUpdate(nextProps) {
    //    return !this.arraysEqual(this.props.locations, nextProps.locations);
    //}/

    constructor(props) {
        super(props);

    }

    render() {


        var defaultProps = {
            center: {lat: 59.938043, lng: 30.337157},
            zoom: 9,
            greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
        };
        var divStyle = {
            height: '500px'
        };
        var vehicleArray = this.obj2array(this.props.vehicles);
        var vehicleLocationArray = this.obj2array(this.props.vehicleLocations);

        var handleClick = this.props.handleClick;
				var placeComponents = []
        if (vehicleArray.length === vehicleLocationArray.length) placeComponents = vehicleArray.map(function (vehicle) {
            var vehicleLocationsIndex = 0;
            for (var vehicleLocation in vehicleLocationArray) {
                if (vehicleLocationArray[vehicleLocation].vehicleId == vehicle.id) {
                    break;
                }
                vehicleLocationsIndex++;
            }
            var lat = vehicleLocationArray[vehicleLocationsIndex].lat;
            var lng = vehicleLocationArray[vehicleLocationsIndex].lon;

            function toColor(num) {
                num >>>= 0;
                var b = num & 0xFF,
                    g = (num & 0xFF00) >>> 8,
                    r = (num & 0xFF0000) >>> 16,
                    a = ( (num & 0xFF000000) >>> 24 ) / 255;
                return "rgba(" + [r, g, b, a].join(",") + ")";
            }

            var color = toColor(-299990 - vehicleLocationsIndex * 50000);
            var text = vehicle.kind + " " + vehicle.serialNumber;
            return <Place handleClick={handleClick} data={vehicle.id} lat={lat} lng={lng}
                          color={color} text={text} /* Kreyser Avrora */ />
        });
        return (
            <div style={divStyle}>
                <GoogleMap
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}>
                    {placeComponents}

                </GoogleMap>
            </div>
        );
    }

    obj2array(obj) {
        var result = new Array();
        if (obj != null) {
            for (var property in obj) {
                result.push(obj[property]);
            }
        }
        return result;
    }


}
