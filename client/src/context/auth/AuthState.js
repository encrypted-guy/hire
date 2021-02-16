import React, {useReducer} from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import axios from 'axios'

import SetAuthHeaders from '../../utils/SetAuthHeaders'

const AuthState = props => {
    const InitState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: false,
        error: null
    }
    const [state, dispatch] = useReducer(AuthReducer, InitState)
    //----------------------------------------------------------
    
    // LOADUSER
    const loaduser = async () => {
        if(localStorage.token){
            SetAuthHeaders(localStorage.token)
        }
        try {
            setLoading()
            const res = await axios.get('/api/v1/user')
            dispatch({
                type: 'USER_LOARED',
                payload: res.data.user
            })
        } catch (err) {
            dispatch({
                type: 'AUTH_ERROR' 
            })
        }
    }

    // REGISTER both normal and company user
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            setLoading()
            const res = await axios.post('/api/v1/register', formData, config)
            dispatch({
                type: 'REGISTER_USER',
                payload: res.data
            })
            loaduser()
        } catch (err) {
            dispatch({
                type: 'REGISTER_FAIL',
                payload: err.response.data.msg
            })
        }
    }

    // LOGIN EXISTING USER
    const login = async fromData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            setLoading()
            const res = await axios.post('/api/v1/login', fromData, config)
            dispatch({
                type: 'LOGIN_USER',
                payload: res.data
            })
            loaduser()

        }catch(err) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response.data.msg
            })
            console.log(err)
        }
    }

    //LOGOUT------| REMOVE THE token
    const logout = () => {
        dispatch({
            type: 'LOGOUT'
        })
    }

    const clearErrors = () => {
        dispatch({
            type: 'CLEAR_ERRORS'
        })
    }
    // SET LOADING
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })
   
    //----------------------------------------------------------
    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error,
            clearErrors,
            register,
            login,
            loaduser,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState