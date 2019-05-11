import React, { Component } from 'react'
import { getUserVacs, AddFollow, unAddFollow } from '../../../state/Action';
// Import all App dependencies.
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client';
const socket = io('http://localhost:9999');



class Vacation extends Component {

    async componentDidMount() {
        /*         socket.on('vacationsChange', async (msg) => {
                    await this.props.getuservac(20)
                }) */
    }

    state = {
        unchecked: false
    }

    render() {

        return (
            <div className="col s3">
                <div className="card">
                    <div className="card-image">
                        <img src={this.props.vacation.picture} alt="" />
                        <span className="card-title">{this.props.vacation.destination}</span>
                    </div>
                    <div className="card-content center">
                        {this.props.vacation.description}<br />

                        <i className="fas fa-plane-departure"></i> {this.props.vacation.fromdate}<br />
                        <i className="fas fa-plane-departure"></i> {this.props.vacation.todate} <br /><br />
                        {this.props.vacation.price} <i className="fas fa-shekel-sign"></i>
                    </div>
                    <div className="card-action">
                        <div className="switch center">
                            <label>
                                Unfollow
                                    <input type="checkbox"
                                    checked={this.props.check}
                                    onChange={this.updateFollow.bind(this)}
                                />
                                <span className="lever"></span>
                                Follow
                                 </label>
                        </div> <br /> <br />
                        {this.props.vacation.followers}
                    </div>
                </div>
            </div>
        )
    }

    changeCheck() {
        this.setState({unchecked:true})
    }

    updateFollow(ev) {

        if (ev.target.checked) {

            this.props.addfollow(this.props.vacation.id, this.props.currentUserID, this.props.vacation.followers);
        } else {
            this.setState({unchecked:false});
            this.props.unaddfollow(this.props.vacation.id, this.props.currentUserID, this.props.vacation.followers);
        }
    }

}



const mapDispatchToProps = dispatch => {
    return {
        getuservac: (data) => {
            dispatch(getUserVacs(data))
        },
        addfollow: (vacID, memberID, follow) => {
            dispatch(AddFollow(vacID, memberID, follow))
        },
        unaddfollow: (vacID, memberID, follow) => {
            dispatch(unAddFollow(vacID, memberID, follow))
        }
    }
};

const mapStateToProps = state => {
    return {
        allvacations: state.vacations,
        getvacationsmsg: state.getvacationsmsg,
        isLogged: state.isLogged,
        isAdmin: state.isAdmin,
        currentUser: state.currentUser,
        currentUserID: state.currentMemberId,
        addVacErr: state.addVacErr
    };
};

const vacation = connect(mapStateToProps, mapDispatchToProps)(Vacation);
export default withRouter(vacation);