import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import { resetErrorMessage } from '../actions'
import SegmentList from './SegmentList'
import { Button,ButtonToolbar } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleDismissClick = this.handleDismissClick.bind(this)
    }

    handleDismissClick(e) {
        this.props.resetErrorMessage()
        e.preventDefault()
    }

    handleChange(nextValue) {
        this.props.pushState(null, `/${nextValue}`)
    }

    renderErrorMessage() {
        const { errorMessage } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#"
                    onClick={this.handleDismissClick}>
                Dismiss
            </a>)
            </p>
        )
    }

    render() {
        const { children, segments } = this.props;

        return (
            <div>
                <hr />
                {this.renderErrorMessage()}
                {children}
            </div>
        )
    }
}

App.propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node
}

function mapStateToProps(state) {
    return {
        errorMessage: state.errorMessage,
    }
}

export default connect(mapStateToProps, {
    resetErrorMessage,
    pushState
})(App)


/*

 import React, { Component, PropTypes } from 'react'
 import { connect } from 'react-redux'
 import { loadUser, loadStarred ,loadSegments} from '../actions'
 import User from '../components/User'
 import SegmentList from '../components/SegmentList'
 import Repo from '../components/Repo'
 import List from '../components/List'
 import zip from '../node_modules/lodash/array/zip'

 function loadData(props) {
 const { login } = props
 props.loadUser(login, ['name'])
 props.loadStarred(login)
 }

 class UserPage extends Component {
 constructor(props) {
 super(props)
 this.renderRepo = this.renderRepo.bind(this)
 this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
 this.handleSegmentClick = this.handleSegmentClick.bind(this)
 }

 componentWillMount() {
 loadData(this.props)
 }

 componentWillReceiveProps(nextProps) {
 if (nextProps.login !== this.props.login) {
 loadData(nextProps)
 }
 }

 handleLoadMoreClick() {
 this.props.loadStarred(this.props.login, true)
 }

 handleSegmentClick(segmentData) {
 this.props.loadSegments(segmentData);
 }

 renderRepo([ repo, owner ]) {
 return (
 <Repo repo={repo}
 owner={owner}
 key={repo.fullName}/>
 )
 }

 render() {
 const { user, login } = this.props
 if (!user) {
 return <h1><i>Loading {login}’s profile...</i></h1>
 }

 const { starredRepos, starredRepoOwners, starredPagination , segments} = this.props;

 // This part previouly goes inside render's "div" element
 //<User user={user}/>
 //<hr />
 //<List renderItem={this.renderRepo}
 //items={zip(starredRepos, starredRepoOwners)}
 //onLoadMoreClick={this.handleLoadMoreClick}
 //loadingLabel={`Loading ${login}’s starred...`}
 //{...starredPagination} />

 return (
 <div>
 <SegmentList segments={segments} onSegmentClick={this.handleSegmentClick}/>
 </div>
 )
 }
 }

 UserPage.propTypes = {
 login: PropTypes.string.isRequired,
 user: PropTypes.object,
 starredPagination: PropTypes.object,
 starredRepos: PropTypes.array.isRequired,
 starredRepoOwners: PropTypes.array.isRequired,
 loadUser: PropTypes.func.isRequired,
 loadStarred: PropTypes.func.isRequired
 }

 function mapStateToProps(state) {
 const { login } = state.router.params;
 var segmentsObj = state.entities.segments;
 var segments = new Array();
 if (segmentsObj != null) {
 for (var segment in segmentsObj) {
 segments.push(segmentsObj[segment]);
 }
 }
 const {
 pagination: { starredByUser },
 entities: { users, repos }
 } = state

 const starredPagination = starredByUser[login] || {ids: []}
 const starredRepos = starredPagination.ids.map(id => repos[id])
 const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

 return {
 segments,
 login,
 starredRepos,
 starredRepoOwners,
 starredPagination,
 user: users[login]
 }
 }

 export default connect(mapStateToProps, {
 loadUser,
 loadStarred,
 loadSegments
 })(UserPage)


 */