
export default (state, action) => {
    switch(action.type) {
        case 'USER_LOARED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case 'REGISTER_USER':
        case 'LOGIN_USER':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case 'CLEAR_ERRORS': 
            return {
                ...state,
                error: null
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        default: 
            return state
    }
}
