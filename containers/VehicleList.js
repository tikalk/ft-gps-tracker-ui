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

        // Integration instructions
        //-------------------------
        // When there is daily data this should be changed back to start of day,
        // also need to add time filters in the ui


        var startOfYear = new Date(now.getTime() -
            -now.getMonth() * 30 * 24 * 60 * 60 * 1000 -
            now.getHours() * 60 * 60 * 1000 -
            now.getMinutes() * 60 * 1000 -
            now.getSeconds() * 1000 -
            now.getMilliseconds());
        this.props.pushState(null, "/segments/" + data + "/" + startOfYear.getTime() / 1000 + "/" + Date.now());
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


        //Integration instructions
        //------------------------
        // When live we socket feed is working remove following block

        // if (this.state.firstRender) {
        //     this.state.firstRender = false;
        //     this.callLoadVehicleLocationsData = this.callLoadVehicleLocationsData.bind(this);
        //     setInterval(this.callLoadVehicleLocationsData, 200);
        // }

        if (this.state.firstRender) {
            const {vehicles } = this.props;
            var vehicleArray = this.obj2array(vehicles);
            var callLoadVehicleLocationsData = this.callLoadVehicleLocationsData.bind(this);

            this.state.firstRender = false;
            var eb = new EventBus("http://fleet-tracker.tikalknowledge.com:8080/eventbus");
//            var eb = new EventBus("http://52.33.17.211:8080");

            eb.onopen = function () {
                eb.registerHandler("gps-feed-all", function (err, msg) {
                callLoadVehicleLocationsData(msg);
                })
              }
//            vehicleArray.map(function (vehicle) {
//                eb.onopen = function () {
//                    eb.registerHandler("gps-feed-all", function (err, msg) {
//
//                        //Integration instructions
//                        //------------------------
//                        // When live feed will work make sure locations are parsed from msg
//
//                        callLoadVehicleLocationsData(msg);
//                    })
//                }
//            });
        }

        const {vehicles,vehicleLocations } = this.props;


        return (
            <div>
                <Panel header={"Vehical Live Map View"} bsStyle="info">
                    <VehicleGoogleMap vehicles={vehicles} vehicleLocations={vehicleLocations}
                                      handleClick={this.handleVehicleClick}/>
                </Panel>
                <Panel>
                    <UIList items={vehicles} getListItemContent={this.getListItemContent}
                            getListItemHeader={this.getListItemHeader}
                            handleClick={this.handleVehicleClick}/>
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
