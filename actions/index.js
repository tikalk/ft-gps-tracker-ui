import { CALL_API, PUSH_API, Schemas } from '../middleware/api'

export const ANGELS_REQUEST = 'ANGELS_REQUEST'
export const ANGELS_SUCCESS = 'ANGELS_SUCCESS'
export const ANGELS_FAILURE = 'ANGELS_FAILURE'

export const SEGMENTS_REQUEST = 'SEGMENTS_REQUEST'
export const SEGMENTS_SUCCESS = 'SEGMENTS_SUCCESS'
export const SEGMENTS_FAILURE = 'SEGMENTS_FAILURE'

export const PLACES_REQUEST = 'PLACES_REQUEST'
export const PLACES_SUCCESS = 'PLACES_SUCCESS'
export const PLACES_FAILURE = 'PLACES_FAILURE'


export const VEHICLE_LOCATIONS_REQUEST = 'VEHICLE_LOCATIONS_REQUEST'
export const VEHICLE_LOCATIONS_SUCCESS = 'VEHICLE_LOCATIONS_SUCCESS'
export const VEHICLE_LOCATIONS_FAILURE = 'VEHICLE_LOCATIONS_FAILURE'


export const LOAD_PLACES = 'LOAD_PLACES'

function fetchSegments(payload) {
    return {
        [CALL_API]: {
            types: [SEGMENTS_REQUEST, SEGMENTS_SUCCESS, SEGMENTS_FAILURE],
            endpoint: `/segments/angel/${payload.params.vehicleId}?start=${payload.params.start}&stop=${payload.params.stop}`,
            schema: Schemas.VEHICLE
        }
    }
}

export function loadSegments(payload) {
    return (dispatch, getState) => {
        return dispatch(fetchSegments(payload))
    }
}


function fetchPlaces(payload) {
    return {
        [CALL_API]: {
            types: [PLACES_REQUEST, PLACES_SUCCESS, PLACES_FAILURE],
            endpoint: `/gps/angel/${payload.params.vehicleId}?start=${payload.params.start}&stop=${payload.params.stop}`,
            schema: Schemas.VEHICLE,
        }
    }
}

export function loadPlaces(payload) {
    return (dispatch, getState) => {
        return dispatch(fetchPlaces(payload))
    }
}


function fetchVehicles(payload) {
    return {
        [CALL_API]: {
            types: [ANGELS_REQUEST, ANGELS_SUCCESS, ANGELS_FAILURE],
            endpoint: `/api/v1/guardians?username=${payload.routeParams.userName}`,
            schema: Schemas.VEHICLE
        }
    }
}

export function loadVehicles(payload) {
    return (dispatch, getState) => {
        return dispatch(fetchVehicles(payload))
    }
}


function fetchVehicleLocations(payload) {
    return {
        [CALL_API]: {
            types: [VEHICLE_LOCATIONS_REQUEST, VEHICLE_LOCATIONS_SUCCESS, VEHICLE_LOCATIONS_FAILURE],
            endpoint: ``,
            schema: Schemas.VEHICLE,
            payload:payload,
            skipHttpRequest: true
        }
    }
}


export function loadVehicleLocations(payload) {
    return (dispatch, getState) => {
        return dispatch(fetchVehicleLocations(payload))
    }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
    return {
        type: RESET_ERROR_MESSAGE
    }
}


