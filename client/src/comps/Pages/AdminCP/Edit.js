import React, { Component } from 'react'
import { getAdminVacations, updateVacation } from '../../../state/Action';
// Import all App dependencies.
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal, Button, Icon } from 'react-materialize'
import io from 'socket.io-client';
const socket = io('http://localhost:9999');


class Edit extends Component {

    state = {
        description: '',
        destination: '',
        picture: '',
        fromdate: '',
        todate: '',
        price: '',
        alert: ''
    }

    async componentDidMount() {
        socket.on('vacationsChange', async (msg) => {
            await this.props.getadminvac(this.props.currentMemberId)
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <form onSubmit={this.dontSend.bind(this)} className="col s12">
                    {this.props.alert}
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix fas fa-map-marker-alt"></i>
                                <input id="icon_prefix" onChange={this.handleChange.bind(this)} name="destination" type="text" className="validate" />
                                <label htmlFor="icon_prefix">{this.props.v.destination}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix fas fa-question-circle"></i>
                                <input id="icon_telephone" onChange={this.handleChange.bind(this)} name="description" type="text" className="validate" />
                                <label htmlFor="icon_telephone">{this.props.v.description}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix fas fa-images"></i>
                                <input id="icon_telephone" onChange={this.handleChange.bind(this)} name="picture" type="file" className="validate" />
                                <label htmlFor="icon_telephone">Picture</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix fas fa-plane-departure"></i>
                                <input type="date" onChange={this.handleChange.bind(this)} name="fromdate" className="datepicker"></input>
                                <label htmlFor="icon_telephone">{this.props.v.fromdate}</label>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix fas fa-plane-arrival"></i>
                                <input type="date" onChange={this.handleChange.bind(this)} name="todate" className="datepicker"></input>
                                <label htmlFor="icon_telephone">{this.props.v.todate}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix fas fa-dollar-sign"></i>
                                <input id="icon_telephone" onChange={this.handleChange.bind(this)} name="price" type="text" className="validate" />
                                <label htmlFor="icon_telephone">{this.props.v.price}</label>
                            </div>
                        </div>
                        <div className="row center">
                            <button className="btn waves-effect waves-light"  onClick={this.update.bind(this)}  type="button" name="action">
                                Add Vacation <i className="material-icons left far fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        );
    }

    update() {

        let mandatory = this.state;
        if (mandatory.destination === '' || mandatory.destination === this.props.v.destination) {
            this.setState({ alert: 'Fill destination input' });
        }
        else if (mandatory.description === '' || mandatory.description === this.props.v.description) {
            this.setState({ alert: 'Fill description input' });
        }
        else if (mandatory.fromdate === '' || mandatory.fromdate === this.props.v.fromdate) {
            this.setState({ alert: 'Fill fromdate input' });
        }
        else if (mandatory.todate === '' || mandatory.todate === this.props.v.todate) {
            this.setState({ alert: 'Fill todate input' });
        }
        else if (mandatory.price === '' || mandatory.price === this.props.v.frompricedate) {
            this.setState({ alert: 'Fill price input' });
        } else {

            // Update.
            this.props.updatevac(this.props.v.id, this.state);

        }

        
    }

    handleChange(ev) {
        if (ev.target.name === 'picture') {
            let file = ev.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader.result);
                this.setState({ picture: reader.result });
            }
        }
        this.setState({ [ev.target.name]: ev.target.value })
    }

    dontSend(e) {
        e.preventdefault();
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getadminvac: (data) => {
            dispatch(getAdminVacations(data))
        },
        updatevac: (vacID, data) => {
            dispatch(updateVacation(vacID, data))
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

const edit = connect(mapStateToProps, mapDispatchToProps)(Edit);
export default withRouter(edit);