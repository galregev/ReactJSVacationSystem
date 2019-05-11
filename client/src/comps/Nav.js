import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavLink as Link } from 'react-router-dom'
import { SideNav, SideNavItem, Button } from 'react-materialize';
import { connect } from 'react-redux'
import Axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'

// Actions.
import { logOut, MakeLogin, MakeAdminLogin, getAdminVacations, getUserVacs } from '../state/Action'


class Nav extends Component {

  state = {
    adminLog: '',
  }

  async componentDidMount() {
    await this.refresh()
     await this.props.getvacations() 
/*     await this.props.getuservac(this.props.currentUserID) */
  }

  refresh() {
    Axios.get('/member/session')
      .then((data) => {
        if (data.data.isLogged === true) {
          if (data.data.isAdmin === 'true') {
            console.log('You already logged in as administator');
            this.props.adminLogin(data.data);
          } else {
            console.log('You already logged in');
            this.props.loginRequest(data.data);
          }
        }
      })
      .catch(err => console.log(err));
  }

  logOutNow() {
    Axios.get('/member/logout')
      .then(data => {
        console.log(data);
        this.props.goLogOut();
        this.props.history.push('/');
      })
      .catch(err => console.log(err));

  }

  render() {
    if (this.props.isAdmin === 'true') {
      return (
        <div>
        <nav className="nav-extended">
        <div class="nav-wrapper">
          <div className="container">
            <div className="brand-logo">Wellcome Back {this.props.currentUser}!</div>
            <a href="#mobile-demo" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/adminmain">Admin Main</Link></li>
              <li><Link to="/admin">Add Vacation</Link></li>
              <li><Link to="/admin/graph">Graph</Link></li>
              <li><Link onClick={this.logOutNow.bind(this)} to="/">Logout</Link></li>
            </ul>
            </div>
            </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li><Link to="/adminmain">Admin Main</Link></li>
          <li><Link to="/admin">Add Vacation</Link></li>
          <li><Link to="/admin/graph">Graph</Link></li>
          <li><Link onClick={this.logOutNow.bind(this)} to="/signup">SignUp</Link></li>
        </ul>
        </div>
/*         <nav>
          <div className="nav-wrapper">
            <div className="brand-logo">Hey Admin -> {this.props.currentUser}!</div>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/adminmain">Admin Main</Link></li>
              <li><Link to="/admin">Add Vacation</Link></li>
              <li><Link to="/admin/graph">Graph</Link></li>
              <li><button onClick={this.logOutNow.bind(this)}>Logout</button></li>
            </ul>
          </div>
        </nav> */
      );
    } else {
      if (this.props.isLogged) {
        return (
          <div>
          <nav className="nav-extended">
          <div class="nav-wrapper">
            <div className="container">
              <div className="brand-logo">Wellcome Back {this.props.currentUser}!</div>
              <a href="#mobile-demo" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/">Main</Link></li>
                <li><Link to="/signin">SignIn</Link></li>
                <li><Link onClick={this.logOutNow.bind(this)} to="/">Logout</Link></li>
              </ul>
              </div>
              </div>
          </nav>
          <ul className="sidenav" id="mobile-demo">
            <li><Link to="/">Main</Link></li>
            <li><Link to="/signin">SignIn</Link></li>
            <li><Link onClick={this.logOutNow.bind(this)} to="/signup">SignUp</Link></li>
          </ul>
          </div>
        )
      } else {
        return (
          <div>
          <nav className="nav-extended">
          <div className="nav-wrapper">
            <div className="container">
              <div className="brand-logo">Vacation</div>
              <a href="#mobile-demo" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/">Main</Link></li>
                <li><Link to="/signin">SignIn</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
              </ul>
              </div>
              </div>
          </nav>
          <ul className="sidenav" id="mobile-demo">
            <li><Link to="/">Main</Link></li>
            <li><Link to="/signin">SignIn</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
          </ul>
          </div>
        )
      }
    }

  }

}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin,
    currentUserID: state.currentMemberId,
    isLogged: state.isLogged,
    userFollowed: state.UserFollowed,
    UserNoFollow: state.UserNoFollow,
    currentUser: state.currentMember
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
    goLogOut: (data) => {
      dispatch(logOut(data));
    },
    getvacations: (data) => {
      dispatch(getAdminVacations(data))
    },
    getuservac: (data) => {
      dispatch(getUserVacs(data))
    }
  };
};


const navbar = connect(mapStateToProps, mapDispatchToProps)(Nav);
export default withRouter(navbar);
