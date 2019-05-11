import React, { Component } from 'react'
import './App.css'

// Import all App dependencies.
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'

// Import all App Components.
import Nav from './comps/Nav'
import Signup from './comps/Auth/Signup'
import Signin from './comps/Auth/Signin'
import Main from './comps/Pages/Main'
import AdminCP from './comps/Pages/AdminCP/Admin'

// Actions.
import { MakeLogin, MakeAdminLogin, getUserVacs } from './state/Action'
import AdminMain from './comps/Pages/AdminCP/AdminMain';
import Graph from './comps/Pages/AdminCP/Graph';
import Footer from './comps/Footer';


class App extends Component {

  componentDidMount() {
     /* this.props.getuservac(this.props.currentUserID) */
  }

  render() {
    return (
      <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route exact path="/admin" component={AdminCP} />
            <Route exact path="/adminmain" component={AdminMain} />
            <Route exact path="/admin/graph" component={Graph} />
          </Switch>
          <Footer />
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin,
    currentUserID: state.currentMemberId,
    isLogged: state.isLogged,
    currentUser: state.currentMember,
    allvacations: state.vacations,
    userFollowed: state.UserFollowed,
    UserNoFollow: state.UserNoFollow,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: data => {
      return dispatch(MakeLogin(data));
    },
    adminLogin: data => {
      return dispatch(MakeAdminLogin(data));
    },
        getuservac: (data) => {
            dispatch(getUserVacs(data))
        }
  };
};

const app = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(app);

