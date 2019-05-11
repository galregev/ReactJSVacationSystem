import React, { Component } from 'react'

// Import all App dependencies.
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions.
import { MakeLogin, logOut, getAdminVacations, getUserVacs } from '../../../state/Action';
import VacationAdmin from './VacationAdmin';
import io from 'socket.io-client';
const socket = io('http://localhost:9999');

class AdminMain extends Component {

    async componentDidMount() {
        socket.on('vacationsChange', async (msg) => {
        })
    }

    render() {

        if (this.props.isAdmin === 'true') {

            return (
                <div className="row">
                    <div className="card indigo darken-3 center-align">
                        <div className="card-content white-text">
                            <span className="card-title">All Vacations</span>
                        </div>
                    </div>

                    {this.props.allvacations.map(vacation => (
                        <VacationAdmin
                            key={vacation.id}
                            vacation={vacation}
                        />
                    ))}

                </div>
            )

        }

        return (
            <div>
                <h1> Hello From Admin </h1>
                <p> Main Page content </p>
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

const adminmain = connect(mapStateToProps, mapDispatchToProps)(AdminMain);
export default withRouter(adminmain);