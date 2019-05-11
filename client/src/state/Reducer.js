// The initialize state.
const initState = {
    vacations: [],
    UserFollowed: [],
    UserNoFollow: [],
    currentMemberId: 0,
    currentMember: '',
    regMsg: '',
    regMsg_success: '',
    isLogged: false,
    isAdmin: 'false',
    formMsg: '',
    loginPass: '',
    loginUser: '',
    userFirst: '',
    addVacErr: ''
}

const Reducer = (state = initState, action) => {

    switch (action.type) {
        case 'SIGNIN':
            let newStateSignUp = Object.assign({}, state, {
                isLogged: true,
                currentMember: action.data.firstName,
                currentMemberId: action.data.userID,
            })
            return newStateSignUp;

        case 'SIGNIN_ADMIN':
            let newStateAdminLogin = Object.assign({}, state, {
                isLogged: true,
                isAdmin: 'true',
                currentMember: action.data.firstName,
                currentMemberId: action.data.userID,

            })
            return newStateAdminLogin;

        case 'SIGNUP_TAKEN':
            let newStateUserTaken = Object.assign({}, state, {
                isLogged: false,
                currentMember: '',
                currentMemberId: '',
                regMsg: 'The username ' + action.data + ' is Taken.'
            })
            return newStateUserTaken;

        case 'SIGNUP_SUCCESS':
            let newStateSignSuccess = Object.assign({}, state, {
                currentMember: action.data.firstName,
                regMsg_success: 'OK',
                currentMemberId: action.data.userID,
                isLogged: true,
            })
            return newStateSignSuccess;

        case 'ADD_VAC_TRUE':
            let newStateVacAddSeccuss = Object.assign({}, state, {
                addVacErr: '',
                vacations: action.data.data.allVac[0]
            })
            return newStateVacAddSeccuss;

        case 'ADD_VAC_ERR':
            let newStateAddErr = Object.assign({}, state, {
                addVacErr: action.data
            })
            return newStateAddErr;

        case 'GET_VAC_ALL':
            let newStateGetVac = Object.assign({}, state, {
                vacations: action.data.data
            })
            return newStateGetVac;

        case 'SORT_VAC':
            let newStateSortVac = Object.assign({}, state, {
                UserFollowed: action.data.data.yesfollow,
                UserNoFollow: action.data.data.nofollow,
            })
            return newStateSortVac;

        case 'ADD_FOLLOW':
            let newStateAddVac = Object.assign({}, state, {

            })
            return newStateAddVac;

        case 'UPDATE_VAC':
            let newStateUpdateVac = Object.assign({}, state, {
                
            })
            return newStateUpdateVac;

        case 'DELETE_VAC':
            let newStateDelVac = Object.assign({}, state, {

            })
            return newStateDelVac;

        case 'LOGOUT':
            let newStateLogOut = Object.assign({}, state, {
                isLogged: false,
                isAdmin: 'false',
                currentMember: '',
                currentMemberId: 0
            })
            return newStateLogOut;

        case 'INPUT_HANDLE':
            let newStateInputHandle = Object.assign({}, state, {
                [action.data.name]: action.data.value
            });
            return newStateInputHandle;

        case "IS_LOGGED":
            let newStateIsLogged = Object.assign({}, state, {
                currentMemberId: action.data.userid,
                currentMember: action.data.firstname,
                isLogged: true
            });
            return newStateIsLogged;

        default:
            return state;
    }

}

export default Reducer;