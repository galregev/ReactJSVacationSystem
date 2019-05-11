import React, { Component } from 'react'

// Import all App dependencies.
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink as Link } from 'react-router-dom'

// Actions.
import { InputHandler, MakeLogin, MakeAdminLogin, registerUser } from '../../state/Action'

class Signup extends Component {

    state = {
        alert: '',
        firstname: 'firstname',
        lastname: 'lastname',
        username: 'username',
        password: 'password'
    }

    handleText(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    dontSend(e) {
        e.preventdefault();
    }

    async register() {

        // Check that all the fileds are full.
        let mandatory = this.state;
        if (mandatory.firstname === '' || mandatory.firstname === 'firstname') {
            this.setState({ alert: 'Fill firstname input' });
        }
        else if (mandatory.lastname === '' || mandatory.lastname === 'lastname') {
            this.setState({ alert: 'Fill lastname input' });
        }
        else if (mandatory.username === '' || mandatory.username === 'username') {
            this.setState({ alert: 'Fill username input' });
        }
        else if (mandatory.password === '' || mandatory.password === 'password') {
            this.setState({ alert: 'Fill password input' });
        } else {

            // Send the user object to server.
            this.props.goRegister(this.state);

        }

    }


    render() {

        if (this.props.isLogged) {
            return (
                <div className="row">
                    <div className="col s12">
                        <h1> {this.props.currentMember} You already logged in... </h1>
                        <Link to="/"> Go to Main </Link>
                    </div>
                </div>
            )
        }
        return (

            <div className="row newuser">
                <div className="col s12">
                    <div className="container">
                        <div className="blackbox">
                        <div className="row">
                            <form onSubmit={this.dontSend.bind(this)} className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix fas fa-signature"></i>
                                        <input onChange={this.handleText.bind(this)} id="icon_prefix" name="firstname" type="text" className="validate" required />
                                        <label htmlFor="icon_prefix">{this.state.firstname}</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix fas fa-user"></i>
                                        <input onChange={this.handleText.bind(this)} id="icon_prefix" name="lastname" type="text" className="validate" required />
                                        <label htmlFor="icon_prefix">Last Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix fas fa-user"></i>
                                        <input onChange={this.handleText.bind(this)} id="icon_prefix" name="username" type="text" className="validate" required />
                                        <label htmlFor="icon_prefix">User Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix fas fa-user"></i>
                                        <input onChange={this.handleText.bind(this)} id="icon_prefix" name="password" type="text" className="validate" required />
                                        <label htmlFor="icon_prefix">Password</label>
                                    </div>
                                    <div className="row mt-1">
                                        <div className="col s12 center">
                                            <button type="button" onClick={this.register.bind(this)} className="waves-effect center deep-orange waves-dark btn-my-grey"><i className="fas fa-share-alt"></i> Regiser</button>
                                        </div>
                                    </div>
                                    
                                    {this.state.alert}
                                    {this.props.regMsg}
                                    {this.props.bob}
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        formMsg: state.formMsg,
        isAdmin: state.isAdmin,
        isLogged: state.isLogged,
        username: state.loginUser,
        password: state.loginPass,
        regMsg: state.regMsg,
        bob: state.regMsg_success,
        currentMember: state.currentMember
    }
}

const mapDispatchToProps = dispatch => {
    return {
        InputHandler: data => {
            dispatch(InputHandler(data));
        },
        loginRequest: function (data) {
            return dispatch(MakeLogin(data));
        },
        adminLogin: data => {
            return dispatch(MakeAdminLogin(data));
        },
        goRegister: data => {
            return dispatch(registerUser(data))
        }
    };
};

const signup = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default withRouter(signup);