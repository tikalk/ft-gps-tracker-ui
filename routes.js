import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import AngelList from './containers/VehicleList'
import SegmentList from './containers/SegmentList'
import PlacesList from './containers/PlacesList'
import LoginPage from './containers/LoginPage'

export default (
    <Route path="/" component={App}>
        <Route path="/login"
               component={LoginPage}/>
        <Route path="/guardians/:userName"
               component={AngelList}/>
        <Route path="/segments/:vehicleId/:start/:stop"
               component={SegmentList}/>
        <Route path="/places/:vehicleId/:start/:stop"
               component={PlacesList}/>
  </Route>
)
