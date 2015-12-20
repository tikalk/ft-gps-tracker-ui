import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import { loadSegments } from '../actions'
import MapContainer from "./Map"
import UIList from '../components/UIList'
import Panel from 'react-bootstrap/lib/Panel';


function loadSegmentsData(props) {
    const { userName } = props
    props.loadSegments(props)
}

class SegmentList extends Component {
    constructor(props) {
        super(props);
        this.handleSegmentClick = this.handleSegmentClick.bind(this);
    }

    componentWillMount() {
        loadSegmentsData(this.props)
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.segments !== this.props.segments);
    }

    handleSegmentClick(data) {
        this.props.pushState(null, "/places/" + data.vehicleId + "/" + data.startTime + "/" + data.endTime);
    }


    getListItemContent(data) {
        function convertToReadableTime(unix_timestamp) {
            var date = new Date(unix_timestamp * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            return formattedTime;
        }

        return "Start: " + convertToReadableTime(data.startTime) + " ; End: " + convertToReadableTime(data.endTime);
    }

    getListItemHeader(data) {
        return data.segmentType;
    }

    handleClick() {
        const { onSegmentClick } = this.props;
        onSegmentClick(this.props.data);
    }

    render() {
        const {segments } = this.props;

        return (
            <Panel header={"Vehicle Segments"} bsStyle="info">
                <UIList items={segments} getListItemContent={this.getListItemContent}
                        getListItemHeader={this.getListItemHeader}
                        handleClick={this.handleSegmentClick}/>
            </Panel>
        )
    }
}


function mapStateToProps(state) {
    var segmentsObj = state.segments;
    var segments = new Array();
    if (segmentsObj != null) {
        for (var segment in segmentsObj) {// TODO-move to render so won't be executed each time
            segments.push(segmentsObj[segment]);
        }
    }
    return {
        segments,
        errorMessage: state.errorMessage,
    }
}

export default connect(mapStateToProps, {
    loadSegments,
    pushState
})(SegmentList)

