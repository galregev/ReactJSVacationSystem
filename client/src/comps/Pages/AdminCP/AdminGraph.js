import React, { Component } from 'react'

// Import all App dependencies.
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Actions.
import { logOut } from '../../../state/Action'

class AdminGraph extends Component {

    render() {
        return (
            <div>
                <h1> Hello From Admin Graph  !</h1>
            </div>

        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        goLogOut: (data) => {
            dispatch(logOut(data));
        }
    };
};

const mapStateToProps = state => {
    return {
        allvacations: state.allvacations,
        userFollowed: state.userFollowed,
        getvacationsmsg: state.getvacationsmsg,
        isLogged: state.isLogged,
        isAdmin: state.isAdmin,
        currentUser: state.currentUser,
        currentUserid: state.currentUserid
    };
};

const graph = connect(mapStateToProps, mapDispatchToProps)(AdminGraph);
export default withRouter(graph);