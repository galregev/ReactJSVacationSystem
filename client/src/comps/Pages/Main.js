import React, { Component } from 'react'

// Import all App dependencies.
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom'

// Actions.
import { MakeLogin, logOut, getAdminVacations, getUserVacs } from '../../state/Action';
import Axios from 'axios'
import Vacation from './connectedHome/Vacation';
import io from 'socket.io-client';
const socket = io('http://localhost:9999');


class Main extends Component {

    async componentDidMount() {
        await this.refresh()
        await this.props.getuservac(this.props.currentUserID)
        socket.on('vacationsChange', async (msg) => {
            await this.props.getuservac(this.props.currentUserID)
        })
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

    render() {

        if (this.props.isLogged) {
            this.props.getuservac(this.props.currentUserID)
            return (
                <div>
                    
                    <div className="row">
                        <div className="card indigo darken-3 center-align">
                            <div className="card-content white-text">
                                <span className="card-title">Followed Vacations</span>
                            </div>
                        </div>
                        {this.props.userFollowed.map(vacation => (
                            <Vacation
                                check={true}
                                key={vacation.id}
                                vacation={vacation}
                            />
                        ))}
                    </div>
                    <div className="row">
                        <div className="card indigo darken-3 center-align">
                            <div className="card-content white-text">
                                <span className="card-title">unFollowed Vacations</span>
                            </div>
                        </div>

                        {this.props.UserNoFollow.map(vacation => (
                            <Vacation
                                check={false}
                                key={vacation.id}
                                vacation={vacation}
                            />
                        ))}
                    </div>

                </div>
            )

        }

        return (
            <div className="row newuser">
                <div className="shark"></div>
            <div className="container">
                <div className="col s12 m12">
                <div className="blackbox max-3">
                    <div className="heytext">
                        <h1> Hey Guest! </h1>
                        <p> You must be logged in for browse vacations </p>
                        <span> Go signin page - click <Link to="/signin">here</Link> </span>
                    </div>
                </div>
                </div>
                </div>
            </div>

        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: data => {
            return dispatch(MakeLogin(data));
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

const mapStateToProps = state => {
    return {
        allvacations: state.vacations,
        userFollowed: state.UserFollowed,
        UserNoFollow: state.UserNoFollow,
        getvacationsmsg: state.getvacationsmsg,
        isLogged: state.isLogged,
        isAdmin: state.isAdmin,
        currentUser: state.currentUser,
        addVacErr: state.addVacErr,
        currentUserID: state.currentMemberId,
    };
};

const main = connect(mapStateToProps, mapDispatchToProps)(Main);
export default withRouter(main);