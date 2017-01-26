import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { loadVehicles ,loadVehicleLocations} from '../actions';
import { pushState } from 'redux-router'
import UIList from '../components/UIList'
import VehicleGoogleMap from '../components/VehicleGoogleMap'
import Panel from 'react-bootstrap/lib/Panel';


function loadVehiclesData(props) {
    const { userName } = props
    props.loadVehicles(props)
}


function loadVehicleLocationsData(props, data) {
    props.loadVehicleLocations(data)
}

class VehicleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: null,
            firstRender: true,
        };
        this.handleVehicleClick = this.handleVehicleClick.bind(this);


    }


    componentWillMount() {
        loadVehiclesData(this.props)
    }

    shouldComponentUpdate(nextProps) {
        return ((nextProps.vehicles !== this.props.vehicles) || ( nextProps.vehicleLocations !== this.props.vehicleLocations)  );
    }

    handleVehicleClick(data) {
        var now = new Date();
        var startOfDay = new Date(now.getTime() -
            now.getHours() * 60 * 60 * 1000 -
            now.getMinutes() * 60 * 1000 -
            now.getSeconds() * 1000 -
            now.getMilliseconds());
        this.props.pushState(null, "/segments/" + data + "/" + startOfDay.getTime() / 1000 + "/" + Date.now());
    }

    getListItemContent(data) {
        return "Serial Number: " + data.serialNumber;

    }

    getListItemHeader(data) {
        return "Type: " + data.kind;
    }


    handleClick() {
        const { onVehicleClick } = this.props;
        onVehicleClick(this.props.data);
    }

    callLoadVehicleLocationsData(data) {
        loadVehicleLocationsData(this.props, data);
    }

    render() {

        if (this.state.firstRender) {
            const {vehicles } = this.props;
            var vehicleArray = this.obj2array(vehicles);
            var callLoadVehicleLocationsData = this.callLoadVehicleLocationsData.bind(this);

            this.state.firstRender = false;

            var eventbusUrl = 'http://' + SERVER_CONFIG.EVENT_HOST + ':' + SERVER_CONFIG.EVENT_PORT+'/eventbus';

            var eb = new EventBus(eventbusUrl);

            eb.onopen = function () {
                eb.registerHandler("gps-feed-all", function (err, msg) {
                callLoadVehicleLocationsData(msg);
                })
              }
        }

        const {vehicles,vehicleLocations } = this.props;

        var vehicleMap = Object.keys(vehicleLocations).length == 0 ? null : <VehicleGoogleMap vehicles={vehicles} vehicleLocations={vehicleLocations}
                                                               handleClick={this.handleVehicleClick}/>;
        return (
            <div>
                <Panel header={"Vehical Live Map View"} bsStyle="info">
                    {vehicleMap}
                </Panel>
            </div>
        )
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

function mapStateToProps(state) {
    return {
        vehicleLocations: state.vehicleLocations,
        vehicles: state.vehicles,
        errorMessage: state.errorMessage,
    }
}

export default connect(mapStateToProps, {
    loadVehicles,
    loadVehicleLocations,
    pushState
})(VehicleList)
