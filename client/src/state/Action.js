// IMPORTS.
import Axios from 'axios'

export const MakeLogin = user => {
    return ({ type: "SIGNIN", data: user })
}

export const MakeAdminLogin = user => {
    return ({ type: "SIGNIN_ADMIN", data: user })
}

export const registerUser = user => {
    return async dispatch => {

        Axios.post('/member/register', user)
            .then(data => {
                if (data.data.session.msg === 'PASSED') {
                    dispatch({ type: 'SIGNUP_SUCCESS', data: data.data.session });
                } else {
                    dispatch({ type: 'SIGNUP_TAKEN', data: data.data.session.user });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addVacation = (data) => {
    return async (dispatch) => {
        await Axios.post('/vacation/add', data)
            .then(resp => {
                if (resp.data.err) {
                    dispatch({ type: 'ADD_VAC_ERR', data: resp.data.err })
                } else {
                    dispatch({ type: 'ADD_VAC_TRUE', data: resp.data })
                }


            })
            .catch(err => console.log(err))

    }
}

export const getAdminVacations = (data) => {
    return async (dispatch) => {
        Axios.get('/vacation/allvac')
            .then(data => {
                dispatch({ type: 'GET_VAC_ALL', data: data })
            })
            .catch(err => { console.log(err) });
    }
}

export const getUserVacs = data => {
    return async (dispatch) => {
        Axios.get('vacation?currentUserID=' + data)
            .then(vacations => {
                console.log(vacations)
                if (vacations.data.nofollow) {
                    dispatch({ type: 'SORT_VAC', data: vacations })
                }
                else if (vacations.data)
                    console.log(vacations);
            })
            .catch(err => console.log(err))
    }

}

export const AddFollow = (vacID, memberID, follow) => {
    let obj = {
        vacationid: vacID,
        memberid: memberID,
        followers: follow
    }
    return async (dispatch) => {
        Axios.post('/vacation/follow', obj)
            .then(data => {
                dispatch({ type: 'ADD_FOLLOW', data: data })
            })
            .catch(err => console.log(err));
    }
}

export const unAddFollow = (vacID, memberID) => {
    let obj = {
        vacationid: vacID,
        memberid: memberID
    }
    return async (dispatch) => {
        Axios.post('/vacation/unfollow', obj)
            .then(data => {
                dispatch({ type: 'ADD_FOLLOW', data: data })
            })
            .catch(err => console.log(err));
    }
}

export const updateVacation = (vacID, data) => {

    let obj = {
        id: vacID,
        description: data.description,
        destination: data.destination,
        picture: data.picture,
        fromdate: data.fromdate,
        todate: data.todate,
        price: data.price
    }

    return async (dispatch) => {
        debugger
        Axios.post('/vacation/update', obj)
            .then(data => {
                dispatch({ type: 'UPDATE_VAC', data: data })
            })
            .catch(err => {
                console.log(err);
            })
    }

}

export const deletVacation = (vacID) => {
    let obj = {
        vacationid: vacID,
    }
    return async (dispatch) => {
        Axios.post('/vacation/del', obj)
            .then(data => {
                dispatch({ type: 'DELETE_VAC', data: data })
            })
            .catch(err => console.log(err));
    }
}

export const RemoveFollow = vacId => {

    return async (dispatch) => {

    }

}


export const logOut = data => {
    return { type: 'LOGOUT', data: data };
}

export const InputHandler = data => {
    return { type: "INPUT_HANDLE", data: data };
}