import React, { Component } from 'react'
import { getUserVacs, deletVacation, getAdminVacations } from '../../../state/Action';
import { Modal, Button, Icon } from 'react-materialize'
// Import all App dependencies.
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client';
import Edit from './Edit';
const socket = io('http://localhost:9999');

class VacationAdmin extends Component {

    async componentDidMount() {
        socket.on('vacationsChange', async (msg) => {
            await this.props.getadminvac(this.props.currentMemberId)
        })
    }

    render() {

        return (
            <div className="col s3">

                <div className="card">
                    <div className="card-image">
                        <img src={this.props.vacation.picture} alt="" />
                        <div className="editDeleteZone">
                            <button onClick={this.deleteVac.bind(this)} className="deleteEditVac"><i className="fas fa-trash-alt deleteVac"></i></button>
                            <Modal header='Modal Header' trigger={<button className="deleteEditVac "> <i className="fas fa-edit editVac"></i></button>}>
                                <Edit v={this.props.vacation}/>
                            </Modal>
                        </div>

                        <span className="card-title">{this.props.vacation.destination}</span>
                    </div>
                    <div className="card-content center">
                        {this.props.vacation.description}<br /><br />

                        <i className="fas fa-plane-departure"></i> {this.props.vacation.fromdate}<br />
                        <i className="fas fa-plane-departure"></i> {this.props.vacation.todate} <br /><br />
                        {this.props.vacation.price} <i className="fas fa-shekel-sign"></i>


                    </div>
                    <div className="card-action center">
                        {this.props.vacation.followers}
                        </div>
                </div>
            </div>
        )
    }

    deleteVac() {
        this.props.deletevac(this.props.vacation.id)
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getuservac: (data) => {
            dispatch(getUserVacs(data))
        },
        deletevac: (data) => {
            dispatch(deletVacation(data))
        },
        getadminvac: (data) => {
            dispatch(getAdminVacations(data))
        }
    };
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

const vacationadmin = connect(mapStateToProps, mapDispatchToProps)(VacationAdmin);
export default withRouter(vacationadmin);