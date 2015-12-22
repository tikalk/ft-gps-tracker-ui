import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import { loadPlaces } from '../actions'
import UIList from '../components/UIList'
import LocationHistoryGoogleMap from '../components/LocationHistoryGoogleMap'
import Panel from 'react-bootstrap/lib/Panel';


function loadPlacesData(props) {
    const { userName } = props
    props.loadPlaces(props)
}

class PlacesList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var curProps = this.props;
        loadPlacesData(curProps);
        //
        //var timer = setInterval(function () {
        //    loadPlacesData(curProps);
        //    console.log("*** Re-Render ***")
        //}, 200);
    }

    //
    //componentWillReceiveProps(nextProps) {
    //    if (nextProps.plaSegmentces !== this.props.places) {
    //        loadSegmentsData(this.props)
    //    }
    //}

    shouldComponentUpdate(nextProps) {
        return (nextProps.places !== this.props.places);
    }

    getListItemContent(data) {
        return "Latitude: " + data.lat + "; Longitude: " + data.lon;
    }

    getListItemHeader(data) {
        return "Angel " + data.vehicleId + " Location";
    }

    handleClick() {
        const { onSegmentClick } = this.props;
        onSegmentClick(this.props.data);
    }

    render() {
        const {places } = this.props;

        var historyMap = Object.keys(places).length == 0 ? null : <LocationHistoryGoogleMap places={places}/>;
        return (
            <div>
                <Panel header={"Vehical Location History"} bsStyle="info">
                    {historyMap}
                </Panel>

                </div>
        )
    }
}
//<Panel>
//    <UIList items={places} getListItemContent={this.getListItemContent}
//            getListItemHeader={this.getListItemHeader}
//            handleClick={this.handleSegmentClick}/>
//</Panel>

function mapStateToProps(state) {
    var placesObj = state.places;
    var places = new Array();
    if (placesObj != null) {
        for (var place in placesObj) {// TODO-move to render so won't be executed each time
            places.push(placesObj[place]);
        }
    }
    return {
        places,
        errorMessage: state.errorMessage,
    }
}

export default connect(mapStateToProps, {
    loadPlaces,
    //pushState
})(PlacesList)

