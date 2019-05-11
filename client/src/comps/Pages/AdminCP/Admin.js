import React, { Component } from 'react'

// Actions.
import { addVacation, getUserVacs } from '../../../state/Action'

// Import all App dependencies.
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink as Link } from 'react-router-dom'
import io from 'socket.io-client'
const socket = io('http://localhost:9999');



class AdminCP extends Component {

    async componentDidMount() {
        socket.on('vacationsChange', async (msg) => {
            await this.props.getuservac(5)
            this.props.history.push('/')
        })
    }


    state = {
        msgFromServ: ''
    }

    render() {

        if (this.props.isAdmin !== 'true') {
            return (
                <div className="row">
                    <div className="col s12">
                        <h1> Hey! {this.props.currentMember} </h1>
                        <p> You must be logged as administrator to hava access this page. </p>
                        <Link to="/"> Go Back To Main </Link>
                    </div>
                </div>
            )
        }
        return (
            <div>

                <div className="row">
                    <div className="card indigo darken-3 center-align">
                        <div className="card-content white-text">
                            <span className="card-title"><h1> Add new vacation </h1></span>
                        </div>
                    </div>
                </div>

                <div className="card indigo darken-3 center-align">
                    <div className="card-content white-text">
                        <div className="row">
                            <form onSubmit={this.dontSend.bind(this)} className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix fas fa-map-marker-alt"></i>
                                        <input id="icon_prefix" onChange={this.handleChange.bind(this)} name="destination" type="text" className="validate" />
                                        <label htmlFor="icon_prefix">Destination</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix fas fa-question-circle"></i>
                                        <input id="icon_telephone" onChange={this.handleChange.bind(this)} name="description" type="text" className="validate" />
                                        <label htmlFor="icon_telephone">Description</label>
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
                                        <label htmlFor="icon_telephone">StartDate</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix fas fa-plane-arrival"></i>
                                        <input type="date" onChange={this.handleChange.bind(this)} name="todate" className="datepicker"></input>
                                        <label htmlFor="icon_telephone">EndDate</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix fas fa-dollar-sign"></i>
                                        <input id="icon_telephone" onChange={this.handleChange.bind(this)} name="price" type="text" className="validate" />
                                        <label htmlFor="icon_telephone">Price</label>
                                    </div>
                                </div>
                                <div className="row center">
                                    <button className="btn waves-effect waves-light" onClick={this.add.bind(this)} type="button" name="action">
                                        Add Vacation <i className="material-icons left far fa-paper-plane"></i>
                                    </button>
                                </div>
                            </form>
                            {this.props.addVacErr}
                        </div>
                    </div>
                </div>



            </div>

        )
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

    add() {

        // Check that all the fileds are full.
        let mandatory = this.state;
        if (mandatory.destination === '' || mandatory.destination === 'destination') {
            this.setState({ alert: 'Fill destination input' });
        }
        else if (mandatory.description === '' || mandatory.description === 'description') {
            this.setState({ alert: 'Fill description input' });
        }
        else if (mandatory.picture === '' || mandatory.picture === 'picture') {
            this.setState({ alert: 'Fill picture input' });
        }
        else if (mandatory.fromdate === '' || mandatory.fromdate === 'StartDate') {
            this.setState({ alert: 'Fill StartDate input' });
        }
        else if (mandatory.todate === '' || mandatory.todate === 'EndDate') {
            this.setState({ alert: 'Fill End Date input' });
        }
        else if (mandatory.price === '' || mandatory.price === 'EndDate') {
            this.setState({ alert: 'Fill price input' });
        } else {
            this.props.addvacation(this.state);
        }

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addvacation: (data) => {
            dispatch(addVacation(data));
        },
        getuservac: (data) => {
            dispatch(getUserVacs(data))
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

const admin = connect(mapStateToProps, mapDispatchToProps)(AdminCP);
export default withRouter(admin);