import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'
const PrivateRoute = ({ component: Component, ...rest }) => {
    const {isAuthenticated, loading} = useContext(AuthContext)
    return (
        <Route {...rest} render={props => isAuthenticated === false && loading === false ? (
            <Redirect to='/sign-in' />
        ) : (
            <Component {...props} />
        )} />
    )
}

export default PrivateRoute