import React, { Component } from "react";

// Import all App dependencies.
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink as Link } from "react-router-dom";
import Axios from "axios";

// Actions.
import {
  InputHandler,
  MakeLogin,
  MakeAdminLogin,
  getUserVacs
} from "../../state/Action";

class Signin extends Component {
  state = {
    alert: ""
  };

  handleText(e) {
    const sendIt = { name: e.target.name, value: e.target.value };
    this.props.InputHandler(sendIt);
  }

  dontSend(e) {
    e.preventdefault();
  }

  async sendLogin() {
    let logObj = {
      user: this.props.username,
      pass: this.props.password
    };

    if (logObj.user === "" || logObj.pass === "") {
      this.setState({ alert: "Please fill all the inputs" });
    }

    await Axios.post("/member/login", logObj)
      .then(data => {
        console.log(data);
        if (data) {
          if (data.data.formMsg) {
            this.setState({ alert: data.data.formMsg });
          } else {
            if (data.data.session) {
              this.props.loginRequest(data.data.session);
              this.props.getuservac(this.props.currentUserID);
              let member = data.data.session;
              this.props.history.push("/");
              if (member.isAdmin === "true") {
                this.props.adminLogin(member);
                this.props.history.push("/adminmain");
              }
            }
          }
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.props.isLogged) {
      return (
        <div className="row">
          <div className="col s12">
            <h1> You already logged in... </h1>
            <Link to="/"> Go to Main </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="row newuser h-60">
        <div className="scuba" />
        <div className="col s12">
          <div className="container">
            <div className="blackbox">
              <div className="row">
                <form
                  method="POST"
                  onSubmit={this.dontSend.bind(this)}
                  className="col s12"
                >
                  <div className="input-field col s12">
                    <i className="material-icons prefix fas fa-user-circle" />
                    <input
                      name="loginUser"
                      onChange={this.handleText.bind(this)}
                      id="icon_prefix"
                      type="text"
                      className="validate"
                      required
                    />
                    <label htmlFor="icon_prefix">User name</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix fas fa-user-circle" />
                    <input
                      name="loginPass"
                      onChange={this.handleText.bind(this)}
                      id="icon_prefix"
                      type="text"
                      className="validate"
                      required
                    />
                    <label htmlFor="icon_prefix">Password</label>
                  </div>
                  <div className="row mb-1">
                    <div className="col s12 center">
                      <Link className="white-text" to="/signup">
                        <button
                          type="button"
                          className="waves-effect btn-my-grey"
                        >
                          Register
                        </button>
                      </Link>
                      <button
                        type="button"
                        onClick={this.sendLogin.bind(this)}
                        className="waves-effect waves-light btn-my-grey animated pulse infinite"
                      >
                        <i className="fas fa-sign-in-alt" /> Log in
                      </button>
                    </div>
                  </div>
                  <hr />
                  {this.state.alert}
                </form>
              </div>
            </div>
          </div>
        </div>
          
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formMsg: state.formMsg,
    isAdmin: state.isAdmin,
    isLogged: state.isLogged,
    username: state.loginUser,
    password: state.loginPass
  };
};

const mapDispatchToProps = dispatch => {
  return {
    InputHandler: data => {
      dispatch(InputHandler(data));
    },
    loginRequest: function(data) {
      return dispatch(MakeLogin(data));
    },
    adminLogin: data => {
      return dispatch(MakeAdminLogin(data));
    },
    getuservac: data => {
      dispatch(getUserVacs(data));
    }
  };
};

const signin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
export default withRouter(signin);
