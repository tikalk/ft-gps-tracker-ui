import * as ActionTypes from '../actions'
import merge from 'lodash/object/merge'
import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'

//Integration instructions
//------------------------
// When live we socket feed is working following 3 variables will no longer be needed
global.locations = [];
global.directionX = 1;
global.directionY = 1;

function normlizeResponse(action, idFName, key) {

    var entitiesTemp
    if (typeof key !== "undefined") {
        entitiesTemp = action.response[key];
    }
    else {
        entitiesTemp = action.response;
    }
    var entities = {};
    for (var entity in entitiesTemp) {
        var entityData = entitiesTemp[entity];
        entities[entityData[idFName]] = entityData;
    }

    return entities;
}

function vehicles(state = {}, action) {
    const { type } = action
    if (type === ActionTypes.ANGELS_SUCCESS) {
        var nextState = merge({}, state, normlizeResponse(action, "id", "vehicles"));
        return Object.assign({}, nextState, {});
    }
    return state;
}

function segments(state = {}, action) {
    const { type } = action
    if (type === ActionTypes.SEGMENTS_SUCCESS) {
        var nextState = merge({}, state, normlizeResponse(action, "_id"))
        return Object.assign({}, nextState, {});
    }
    return state;
}

function places(state = {}, action) {

    const { type } = action

    if (type === ActionTypes.PLACES_SUCCESS) {
        var nextState = merge({}, state, normlizeResponse(action, "_id"))
        return Object.assign({}, nextState, {});
    }

    return state;

}

function vehicleLocations(state = {}, action) {

    const { type } = action
    if (type === ActionTypes.VEHICLE_LOCATIONS_REQUEST) {


        //Integration instructions
        //------------------------
        // When live we socket feed is working
        // 1. UNCOMMENT 2 lines below
        // 2. COMMENT 3 lines that follow
        //var nextState = merge({}, state, normlizeResponse({response: action.payload}, "_id"))
        //return Object.assign({}, nextState, {});

        advanceLocations();
        var nextState = merge({}, state, normlizeResponse({response: global.locations}, "_id"))
        return Object.assign({}, nextState, {});
    }

    return state;

}


// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
    const { type, error } = action

    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return action.error
    }

    return state
}


//Integration instructions
//------------------------
// When live we socket feed is working following function is no longer needed

function advanceLocations() {
    var newLocations = new Array();

    if (global.locations.length > 0) {
        global.directionX = 1;
        global.directionY = 1;
        for (var location in global.locations) {
            global.directionX = global.directionX * -1;
            global.directionY = global.directionY * -1;
            global.locations[location].lat += Math.random() * (global.directionX) / 1000;
            global.locations[location].lon += Math.random() * (global.directionY) / 1000;
            newLocations.push(global.locations[location]);
        }
    } else {
        newLocations = [
            {
                "_id": "9f2b48d7-0ef7-4733-97ff-a2ee5ce42df8",
                "receptionTime": 150901170922,
                "imei": "013950004346194",
                "lat": 59.959413,
                "lon": 30.337844,
                "readingTime": 150901170920,
                "speed": 0,
                "heading": 303,
                "distance": 100,
                "vehicleId": 1
            },
            {

                "_id": "b594879a-2efb-4452-97c3-77a8979a2743",
                "receptionTime": 150901170824,
                "imei": "013950004346194",
                "lat": 59.855413,
                "lon": 30.237844,
                "readingTime": 150901170822,
                "speed": 16,
                "heading": 301,
                "distance": 100,
                "vehicleId": 2
            },
            {
                "_id": "82d1cabe-1dbc-42bd-9c92-1bafdfa9032d",
                "receptionTime": 150901170655,
                "imei": "013950004346194",
                "lat": 59.755413,
                "lon": 30.137844,
                "readingTime": 150901170653,
                "speed": 5,
                "heading": 255,
                "distance": 100,
                "vehicleId": 3
            },
            {
                "_id": "f8e321a1-6deb-4b59-b87f-60c286931162",
                "receptionTime": 150901170617,
                "imei": "013950004346194",
                "lat": 40.816926,
                "lon": -73.866666,
                "readingTime": 150901170614,
                "speed": 0,
                "heading": 102,
                "distance": 100,
                "vehicleId": 4
            },
            {
                "_id": "ca8e63b7-498f-4af9-bdab-21bb48c8647c",
                "receptionTime": 150901170501,
                "imei": "013950004346194",
                "lat": 40.816926,
                "lon": -73.866666,
                "readingTime": 150901170459,
                "speed": 0,
                "heading": 102,
                "distance": 100,
                "vehicleId": 5
            }
        ]
    }
    global.locations = newLocations;
}

const rootReducer = combineReducers({
    segments,
    vehicles,
    vehicleLocations,
    places,
    errorMessage,
    router
})

export default rootReducer
