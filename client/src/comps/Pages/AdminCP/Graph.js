import React, { Component } from 'react'
import { getAdminVacations } from '../../../state/Action';
// Import all App dependencies.
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal, Button, Icon } from 'react-materialize'
import io from 'socket.io-client';
const socket = io('http://localhost:9999');
var Chart = require('chart.js');

class Graph extends Component {

    async componentDidMount() {
        await this.createChart();
        socket.on('vacationsChange', async (msg) => {
            await this.props.getadminvac(this.props.currentMemberId)
        })
    }

    createChart() {
        let vacationfollowers = this.props.allvacations.filter(v => v.followers !== 0);
        let labelsArry = [];
        let followers = [];
        for (let i = 0; i < vacationfollowers.length; i++) {
            labelsArry.push(`${vacationfollowers[i].destination}`);
            followers.push(vacationfollowers[i].followers);
        }
        var ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labelsArry,
                datasets: [{
                    label: 'Followers',
                    data: followers,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }

    render() {
        return (
            <canvas id="myChart"></canvas>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
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

const graph = connect(mapStateToProps, mapDispatchToProps)(Graph);
export default withRouter(graph);